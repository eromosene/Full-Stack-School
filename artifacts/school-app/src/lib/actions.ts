"use server";

import { revalidatePath } from "next/cache";
import {
  ClassSchema,
  ExamSchema,
  StudentSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchemas";
import prisma from "./prisma";
import { hashPassword, getSessionUser } from "./auth";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

type CurrentState = { success: boolean; error: boolean };

export const createSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.update({
      where: { id: data.id },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({ where: { id: parseInt(id) } });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.create({ data });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.update({ where: { id: data.id }, data });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteClass = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.class.delete({ where: { id: parseInt(id) } });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    // Generate a shared ID used for both User (login) and Teacher (domain) records
    const id = randomUUID();

    // Create login account if email + password provided
    if (data.email && data.password) {
      const hashed = await hashPassword(data.password);
      await prisma.user.create({
        data: {
          id,
          name: `${data.name} ${data.surname}`,
          email: data.email,
          password: hashed,
          role: "teacher",
        },
      });
    }

    await prisma.teacher.create({
      data: {
        id: data.email && data.password ? id : randomUUID(),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  if (!data.id) return { success: false, error: true };
  try {
    // Update the login User record if it exists
    const userExists = await prisma.user.findUnique({ where: { id: data.id } });
    if (userExists) {
      await prisma.user.update({
        where: { id: data.id },
        data: {
          name: `${data.name} ${data.surname}`,
          ...(data.email ? { email: data.email } : {}),
          ...(data.password ? { password: await hashPassword(data.password) } : {}),
        },
      });
    }

    await prisma.teacher.update({
      where: { id: data.id },
      data: {
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          set: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    // Remove User login record if it exists
    await prisma.user.deleteMany({ where: { id } });
    await prisma.teacher.delete({ where: { id } });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
  console.log(data);
  try {
    const id = randomUUID();

    // Create login account if email + password provided
    if (data.email && data.password) {
      const hashed = await hashPassword(data.password);
      await prisma.user.create({
        data: {
          id,
          name: `${data.name} ${data.surname}`,
          email: data.email,
          password: hashed,
          role: "student",
        },
      });
    }

    await prisma.student.create({
      data: {
        id: data.email && data.password ? id : randomUUID(),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        classId: data.classId ?? null,
        parentId: data.parentId,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
  if (!data.id) return { success: false, error: true };
  try {
    const userExists = await prisma.user.findUnique({ where: { id: data.id } });
    if (userExists) {
      await prisma.user.update({
        where: { id: data.id },
        data: {
          name: `${data.name} ${data.surname}`,
          ...(data.email ? { email: data.email } : {}),
          ...(data.password ? { password: await hashPassword(data.password) } : {}),
        },
      });
    }

    await prisma.student.update({
      where: { id: data.id },
      data: {
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        classId: data.classId ?? null,
        parentId: data.parentId,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteStudent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.user.deleteMany({ where: { id } });
    await prisma.student.delete({ where: { id } });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  try {
    await prisma.exam.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  try {
    await prisma.exam.update({
      where: { id: data.id },
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteExam = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.exam.delete({ where: { id: parseInt(id) } });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// ── Role promotion / demotion ────────────────────────────────────────────────

export const promoteToAdmin = async (userId: string) => {
  const session = await getSessionUser(cookies());
  if (!session) return { success: false, error: true };
  // Re-verify caller's role against DB to avoid stale JWT claims
  const caller = await prisma.user.findUnique({ where: { id: session.id }, select: { role: true } });
  if (!caller || caller.role !== "admin") {
    return { success: false, error: true };
  }
  try {
    await prisma.user.update({ where: { id: userId }, data: { role: "admin" } });
    revalidatePath("/list/teachers");
    revalidatePath("/list/students");
    revalidatePath("/list/parents");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const demoteUser = async (
  userId: string,
  role: "teacher" | "student" | "parent"
) => {
  const session = await getSessionUser(cookies());
  if (!session) return { success: false, error: true };
  // Re-verify caller's role against DB to avoid stale JWT claims
  const caller = await prisma.user.findUnique({ where: { id: session.id }, select: { role: true } });
  if (!caller || caller.role !== "admin") {
    return { success: false, error: true };
  }
  try {
    await prisma.user.update({ where: { id: userId }, data: { role } });
    revalidatePath("/list/teachers");
    revalidatePath("/list/students");
    revalidatePath("/list/parents");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
