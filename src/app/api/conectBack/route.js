import { enviarQuery } from "@/db/enviarQuery";
import { NextResponse } from "next/server";

export function GET() {
    console.log("GET");
    return NextResponse.json("GET response");
}

export async function POST(request) {
    try {
        // Leer el contenido del cuerpo de la solicitud
        const requestBody = await request.text();

        console.log("POST:", requestBody);
        const resp = await enviarQuery(requestBody);
        console.log("-----------------")
        console.log(resp)
        console.log("-----------------")
        // Usar un operador ternario para condicionar la respuesta
        const jsonResponse = resp !== undefined ? resp : [];
        return NextResponse.json(jsonResponse);

    } catch (error) {
        console.log("Error:", error);
        return NextResponse.error("Error occurred", 500);
    }
}
