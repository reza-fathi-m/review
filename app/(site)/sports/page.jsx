"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchApi } from "@/lib/fetch-api";
import { Pencil, Plus, Trash, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function SportsPage() {
  const [formAction, setFormAction] = useState("INSERT");
  const [showDialog, setShowDialog] = useState(false);
  const [sports, setSports] = useState([]);
  const [sportSelected, setSportSelected] = useState({
    name: "",
    singular: false,
    has_leage: true,
    id: "",
  });
  const resetForm = () => {
    setSportSelected({
      name: "",
      singular: false,
      has_leage: true,
      id: "",
    });
    setShowDialog(false);
    setFormAction("INSERT");
  };
  const fetchAllSports = async () => {
    const res = await fetchApi("http://localhost:3001/sports");
    if (res) {
      const data = await res.json();
      setSports(data);
    }
  };

  useEffect(() => {
    fetchAllSports();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    let res;
    switch (formAction) {
      case "INSERT":
        res = await fetchApi(
          "http://localhost:3001/sports/",
          "POST",
          sportSelected,
        );
        break;

      case "UPDATE":
        res = await fetchApi(
          `http://localhost:3001/sports/${sportSelected.id}`,
          "PUT",
          sportSelected,
        );
        break;
      case "DELETE":
        res = await fetchApi(
          `http://localhost:3001/sports/${sportSelected.id}`,
          "DELETE",
        );
        break;
    }
    // if (formAction === "INSERT") {
    //   const res = await fetchApi(
    //     "http://localhost:3001/sports/",
    //     "POST",
    //     sportSelected,
    //   );
    // } else if (formAction === "UPDATE") {
    // } else if (formAction === "DELETE") {
    // }

    if (res) {
      await fetchAllSports();
      resetForm();
    }
  };

  return (
    <>
      <Dialog open={showDialog} onClose={resetForm} showCloseBtn={"false"} >
        <DialogContent className={'sm:max-w-md'} showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {formAction === "INSERT"
                ? "افزودن"
                : formAction === "UPDATE"
                    ? "ویرایش"
                    : "حذف"}{" "}
            ورزش
          </DialogTitle>
          <DialogClose asChild>
            <Button variant={'outline'} size={'icon'} type="button" onClick={resetForm} className={'absolute top-4 left-4'}><X /></Button>
          </DialogClose>
        </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* <div
        className={`fixed bg-black/60 backdrop-blur-sm z-999 w-full min-h-screen h-screen top-0 right-0 place-items-center ${showDialog ? "grid" : "hidden"}`}
      >
        <div className="w-9/10 lg:w-120 p-8 bg-white rounded-xl divide-y divide-gray-200 relative">
          <button
            onClick={resetForm}
            className="absolute top-4 left-4 cursor-pointer"
          >
            <X />
          </button>
          <h1 className="text-2xl font-black text-center pb-6">
            {formAction === "INSERT"
              ? "افزودن"
              : formAction === "UPDATE"
                ? "ویرایش"
                : "حذف"}{" "}
            ورزش
          </h1>
          <div className="pt-4">
            <form onSubmit={submitHandler} className="grid gap-y-6">
              <div className="grid gap-3">
                <label htmlFor="">نام ورزش</label>
                <input
                  type="text"
                  value={sportSelected.name}
                  onChange={(e) =>
                    setSportSelected({ ...sportSelected, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-3">
                <label htmlFor="">نوع ورزش</label>
                <select
                  defaultValue={sportSelected.singular}
                  onChange={(e) =>
                    setSportSelected({
                      ...sportSelected,
                      singular: e.target.value,
                    })
                  }
                >
                  <option value="true">انفرادی</option>
                  <option value="false">گروهی</option>
                </select>
              </div>
              <div className="grid gap-3">
                <label htmlFor="">دارای لیگ است ؟</label>
                <div className="flex gap-x-2 items-center">
                  <input
                    type="radio"
                    name="has_leage"
                    onChange={(e) =>
                      setSportSelected({
                        ...sportSelected,
                        has_leage: true,
                      })
                    }
                  />
                  <label htmlFor="">بله</label>
                </div>
                <div className="flex gap-x-2 items-center">
                  <input
                    type="radio"
                    name="has_leage"
                    onChange={(e) =>
                      setSportSelected({
                        ...sportSelected,
                        has_leage: false,
                      })
                    }
                  />
                  <label htmlFor="">خیر</label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-2">
                <Button
                  type="submit"
                  className={
                    formAction === "INSERT"
                      ? "bg-sky-500 hover:bg-sky-600"
                      : formAction === "UPDATE"
                        ? "bg-emerald-500 hover:bg-emerald-600"
                        : "bg-red-500 hover:bg-red-600"
                  }
                >
                  {formAction === "INSERT"
                    ? "افزودن"
                    : formAction === "UPDATE"
                      ? "ویرایش"
                      : "حذف"}
                </Button>
                
                <Button variant="ghost" onClick={resetForm} type="reset">
                  انصراف
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
      <div className="flex flex-col gap-y-6">
        <div className="bg-white flex justify-between items-center p-4 rounded-lg shadow-xl shadow-gray-200/60">
          <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            ورزش ها
          </h2>
          <Button onClick={() => setShowDialog(true)}>
            <Plus />
            افزودن
          </Button>
        </div>
        <Card>
          <CardHeader></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>نام</TableHead>
                  <TableHead>گروهی</TableHead>
                  <TableHead>لیگ دارد؟</TableHead>
                  <TableHead>عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sports?.map((sport, index) => (
                  <TableRow key={sport.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{sport.name}</TableCell>
                    <TableCell>{sport.singular ? "فردی" : "گروهی"}</TableCell>
                    <TableCell>{sport.has_leage ? "بله" : "خیر"}</TableCell>
                    <TableCell>
                      <Button
                        size="icon"
                        className={"bg-emerald-500 hover:bg-emerald-600"}
                        onClick={() => {
                          setFormAction("UPDATE");
                          setSportSelected(sport);
                          setShowDialog(true);
                        }}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        size="icon"
                        className={"bg-red-500 hover:bg-red-600"}
                        onClick={() => {
                          setFormAction("DELETE");
                          setSportSelected(sport);
                          setShowDialog(true);
                        }}
                      >
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </>
  );
}
