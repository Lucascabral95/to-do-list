import { NextResponse } from "next/server";
import Tasks from "@/models/Tasks";
import mongo from "@/services/MongoDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/authOptions";

export async function POST(req) {
    await mongo();

    try {
        const { tarea, estado, prioridad, descripcion, client, fechaDeTarea, projects, proyecto } = await req.json();

        if (!tarea) {
            return NextResponse.json({ error: "El titulo es requerido" }, { status: 400 });
        }

        const projectsArray = [];
        if (proyecto) {
            projectsArray.push(proyecto);
        } else if (projects) {
            if (Array.isArray(projects)) {
                projectsArray.push(...projects);
            } else {
                projectsArray.push(projects);
            }
        }

        await Tasks.create({
            tarea,
            estado,
            prioridad,
            descripcion,
            client,
            fechaDeTarea,
            projects: projectsArray
        });

        return NextResponse.json({
            message: "Tarea agregada exitosamente",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    await mongo();
    const session = await getServerSession(authOptions);

    try {
        let tasks = ""
        if (session?.user?.id) {
            tasks = await Tasks.find({ client: session?.user?.id });
        } else {
            tasks = await Tasks.find({ email: session?.user?.email });
        }
        const populate = await Tasks.find({}).populate("client");
        return NextResponse.json({
            tasks,
            populate,
            session
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}