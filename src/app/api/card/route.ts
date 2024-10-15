import prisma from "@/utils/prisma";
import { Card,  } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const card = await prisma.card.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (card) {
      return NextResponse.json(card);
    } else {
      return NextResponse.json(
        { error: "Card not found!" },
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error!" },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: Card = await request.json();

    const card = await prisma.card.create({ data: body });
    console.log(card)
    return NextResponse.json(card);
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Internal Server Error!" },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body: Card = await request.json();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (await prisma.card.findFirst({ where: { id: Number(id) } })) {
      const card = await prisma.card.update({
        where: { id: Number(id) },
        data: body,
      });

      return NextResponse.json(card);
    } else {
      return NextResponse.json(
        { error: "Card not found!" },
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error!" },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (await prisma.card.findFirst({ where: { id: Number(id) } })) {
      const card = await prisma.card.delete({
        where: { id: Number(id) },
      });

      return NextResponse.json(card);
    } else {
      return NextResponse.json(
        { error: "Card not found!" },
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error!" },
      {
        status: 500,
      }
    );
  }
}
