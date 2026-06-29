import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getSessionUser } from "@/lib/auth";
import { cookies } from "next/headers";
import { Attendance, Lesson, Prisma, Student, Subject } from "@prisma/client";
import Image from "next/image";

type AttendanceList = Attendance & {
  student: Student;
  lesson: Lesson & { subject: Subject };
};

const AttendanceListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await getSessionUser(cookies());
  const role = user?.role;
  const userId = user?.id;

  const columns = [
    { header: "Student", accessor: "student" },
    { header: "Subject", accessor: "subject", className: "hidden md:table-cell" },
    { header: "Lesson", accessor: "lesson", className: "hidden md:table-cell" },
    { header: "Date", accessor: "date", className: "hidden lg:table-cell" },
    { header: "Status", accessor: "status" },
  ];

  const renderRow = (item: AttendanceList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <span className="font-semibold">
            {item.student.name} {item.student.surname}
          </span>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.lesson?.subject?.name ?? "-"}</td>
      <td className="hidden md:table-cell">{item.lesson?.name ?? "-"}</td>
      <td className="hidden lg:table-cell">
        {new Date(item.date).toLocaleDateString()}
      </td>
      <td>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.present
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {item.present ? "Present" : "Absent"}
        </span>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.AttendanceWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            query.studentId = value;
            break;
          case "search":
            query.student = {
              OR: [
                { name: { contains: value, mode: "insensitive" } },
                { surname: { contains: value, mode: "insensitive" } },
              ],
            };
            break;
          default:
            break;
        }
      }
    }
  }

  if (role === "student") {
    query.studentId = userId!;
  } else if (role === "parent") {
    query.student = { parentId: userId! };
  } else if (role === "teacher") {
    query.lesson = { teacherId: userId! };
  }

  let data: AttendanceList[] = [];
  let count = 0;

  try {
    const [attendanceData, attendanceCount] = await prisma.$transaction([
      prisma.attendance.findMany({
        where: query,
        include: {
          student: true,
          lesson: { include: { subject: true } },
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
        orderBy: { date: "desc" },
      }),
      prisma.attendance.count({ where: query }),
    ]);
    data = attendanceData as AttendanceList[];
    count = attendanceCount;
  } catch {
    data = [];
    count = 0;
  }

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Attendance Records</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AttendanceListPage;
