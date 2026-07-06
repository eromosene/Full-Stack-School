import { Day, PrismaClient, UserSex } from "@prisma/client";
const prisma = new PrismaClient();

// Real Clerk user IDs
const ADMIN_ID = "user_3CGvVDXTbh04rf9uq4PeMTFOGX5";       // Saltech Admin
const TEACHER_ID = "user_3CGvVEFGfWb75otRt6H6uMoY8je";     // Saltech Teacher
const STUDENT_ID = "user_3CGvVFyQH9L0ANqmoff5yoKNO4E";     // Saltech Student
const PARENT_ID = "user_3CGvVPvBhOq6uhM9KuhGwgYDq1I";      // Saltech Parent
const LEKAN_ID = "user_3CJwnV1VuDPHdtSKCL3qXnKM0Gd";       // Lekan Babatunde (admin)
const DANIEL_ID = "user_3CASRQFsOccR3Y0A2sgFCEH8nX2";      // Daniel Unuagba (admin)

async function main() {
  console.log("Starting database seed...");

  // CLASSES
  const classNames = ["1A", "2A", "3A", "4A", "5A", "6A"];
  for (const name of classNames) {
    await prisma.class.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log("✓ Classes");

  // SUBJECTS
  const subjects = [
    "Mathematics", "Science", "English Language", "History",
    "Geography", "Physics", "Chemistry", "Biology",
    "Computer Science", "Civic Education",
  ];
  for (const name of subjects) {
    await prisma.subject.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log("✓ Subjects");

  // REAL ADMINS (from Clerk)
  for (const [id, username] of [
    [ADMIN_ID, "saltech.admin"],
    [LEKAN_ID, "lekan.babatunde"],
    [DANIEL_ID, "daniel.unuagba"],
  ]) {
    await prisma.admin.upsert({
      where: { id },
      update: {},
      create: { id, username },
    });
  }
  console.log("✓ Admin records");

  // REAL TEACHER (from Clerk)
  const allSubjects = await prisma.subject.findMany();
  const allClasses = await prisma.class.findMany();

  await prisma.teacher.upsert({
    where: { id: TEACHER_ID },
    update: {},
    create: {
      id: TEACHER_ID,
      username: "saltech.teacher",
      name: "Saltech",
      surname: "Teacher",
      email: "saltech.teacher@example.com",
      address: "School Campus",
      bloodType: "A+",
      sex: UserSex.MALE,
      birthday: new Date("1985-06-15"),
      subjects: { connect: allSubjects.slice(0, 3).map((s) => ({ id: s.id })) },
      classes: { connect: allClasses.slice(0, 2).map((c) => ({ id: c.id })) },
    },
  });
  console.log("✓ Teacher record");

  // REAL PARENT (from Clerk)
  await prisma.parent.upsert({
    where: { id: PARENT_ID },
    update: {},
    create: {
      id: PARENT_ID,
      username: "saltech.parent",
      name: "Saltech",
      surname: "Parent",
      email: "danielunaugba@gmail.com",
      phone: "08012345678",
      address: "1 Parent Street, Lagos",
    },
  });
  console.log("✓ Parent record");

  // REAL STUDENT (from Clerk) — linked to real parent + class 4A
  const class4A = await prisma.class.findUnique({ where: { name: "4A" } });

  await prisma.student.upsert({
    where: { id: STUDENT_ID },
    update: {},
    create: {
      id: STUDENT_ID,
      username: "saltech.student",
      name: "Saltech",
      surname: "Student",
      email: "loses44665@whyknapp.com",
      address: "1 Student Avenue, Lagos",
      bloodType: "O+",
      sex: UserSex.MALE,
      birthday: new Date("2010-03-20"),
      parentId: PARENT_ID,
      classId: class4A?.id ?? null,
    },
  });
  console.log("✓ Student record");

  // LESSONS (for real teacher)
  const days: Day[] = [Day.MONDAY, Day.TUESDAY, Day.WEDNESDAY, Day.THURSDAY, Day.FRIDAY];
  const lessonNames = [
    "Introduction to Mathematics",
    "Advanced Science",
    "English Comprehension",
    "Computer Science Basics",
    "Biology Lab",
  ];

  for (let i = 0; i < lessonNames.length; i++) {
    const existing = await prisma.lesson.findFirst({ where: { name: lessonNames[i] } });
    if (!existing) {
      await prisma.lesson.create({
        data: {
          name: lessonNames[i],
          day: days[i],
          startTime: new Date(`2024-01-01T${String(8 + i).padStart(2, "0")}:00:00Z`),
          endTime: new Date(`2024-01-01T${String(9 + i).padStart(2, "0")}:00:00Z`),
          subjectId: allSubjects[i % allSubjects.length].id,
          classId: class4A!.id,
          teacherId: TEACHER_ID,
        },
      });
    }
  }
  console.log("✓ Lessons");

  // EXAMS
  const lessons = await prisma.lesson.findMany({ take: 5 });
  for (let i = 0; i < 3; i++) {
    const existing = await prisma.exam.findFirst({ where: { title: `Term ${i + 1} Exam` } });
    if (!existing) {
      await prisma.exam.create({
        data: {
          title: `Term ${i + 1} Exam`,
          startTime: new Date(`2024-03-${10 + i}T09:00:00Z`),
          endTime: new Date(`2024-03-${10 + i}T11:00:00Z`),
          lessonId: lessons[i % lessons.length].id,
        },
      });
    }
  }
  console.log("✓ Exams");

  // ASSIGNMENTS
  for (let i = 0; i < 3; i++) {
    const existing = await prisma.assignment.findFirst({ where: { title: `Assignment ${i + 1}` } });
    if (!existing) {
      await prisma.assignment.create({
        data: {
          title: `Assignment ${i + 1}`,
          startDate: new Date(),
          dueDate: new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000),
          lessonId: lessons[i % lessons.length].id,
        },
      });
    }
  }
  console.log("✓ Assignments");

  // RESULTS for real student
  const exams = await prisma.exam.findMany({ take: 3 });
  for (const exam of exams) {
    const existing = await prisma.result.findFirst({
      where: { examId: exam.id, studentId: STUDENT_ID },
    });
    if (!existing) {
      await prisma.result.create({
        data: { score: Math.floor(Math.random() * 30) + 70, examId: exam.id, studentId: STUDENT_ID },
      });
    }
  }
  console.log("✓ Results");

  // ATTENDANCE for real student
  for (let i = 0; i < 5; i++) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const existing = await prisma.attendance.findFirst({
      where: { studentId: STUDENT_ID, lessonId: lessons[i % lessons.length].id },
    });
    if (!existing) {
      await prisma.attendance.create({
        data: {
          date,
          present: i !== 2,
          studentId: STUDENT_ID,
          lessonId: lessons[i % lessons.length].id,
        },
      });
    }
  }
  console.log("✓ Attendance");

  // EVENTS
  const eventData = [
    { title: "School Opening Ceremony", description: "Welcome back assembly for all students and staff." },
    { title: "Parents Day", description: "Meet your child's teachers and review progress." },
    { title: "Science Fair", description: "Annual science fair for all classes." },
    { title: "Sports Day", description: "Inter-house sports competition." },
    { title: "End of Term Party", description: "Celebration for end of term achievements." },
  ];
  for (let i = 0; i < eventData.length; i++) {
    const existing = await prisma.event.findFirst({ where: { title: eventData[i].title } });
    if (!existing) {
      await prisma.event.create({
        data: {
          ...eventData[i],
          startTime: new Date(Date.now() + (i + 1) * 3 * 24 * 60 * 60 * 1000),
          endTime: new Date(Date.now() + (i + 1) * 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
          classId: i < 3 ? class4A!.id : null,
        },
      });
    }
  }
  console.log("✓ Events");

  // ANNOUNCEMENTS
  const announcementData = [
    { title: "Welcome Back!", description: "Welcome to the new school term. We are excited to have you all back." },
    { title: "Exam Timetable Released", description: "The exam timetable for Term 1 has been released. Please check with your class teacher." },
    { title: "New Library Books", description: "New books have been added to the school library. Students are encouraged to read." },
    { title: "School Fee Reminder", description: "Please ensure school fees are paid by the end of the month." },
    { title: "Holiday Notice", description: "School will be closed on Friday for the public holiday." },
  ];
  for (let i = 0; i < announcementData.length; i++) {
    const existing = await prisma.announcement.findFirst({ where: { title: announcementData[i].title } });
    if (!existing) {
      await prisma.announcement.create({
        data: {
          ...announcementData[i],
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
          classId: i < 2 ? class4A!.id : null,
        },
      });
    }
  }
  console.log("✓ Announcements");

  console.log("\n✅ All done! Database seeded successfully.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
