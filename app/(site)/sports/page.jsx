"use client";
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
      <div
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
                <button
                  type="submit"
                  className={`text-white py-1.5 rounded-lg cursor-pointer ${
                    formAction === "INSERT"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : formAction === "UPDATE"
                        ? "bg-emerald-500 hover:bg-emerald-600"
                        : "bg-red-500 hover:bg-red-600"
                  } `}
                >
                  {formAction === "INSERT"
                    ? "افزودن"
                    : formAction === "UPDATE"
                      ? "ویرایش"
                      : "حذف"}
                </button>
                <button
                  onClick={resetForm}
                  type="reset"
                  className="bg-transparent text-black py-1.5 rounded-lg cursor-pointer hover:bg-gray-200"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="bg-white flex justify-between p-4 rounded-lg shadow-xl shadow-gray-200/60">
          <h3 className="text-2xl font-bold">ورزش ها</h3>
          <button
            onClick={() => setShowDialog(true)}
            className="bg-blue-600 text-white px-4.5 py-1.5 inline-flex items-center gap-x-1.5 rounded-md hover:bg-blue-700 transition-colors duration-200 ease-linear cursor-pointer"
          >
            <Plus />
            افزودن
          </button>
        </div>
        <div className="bg-white  p-4 rounded-lg shadow-xl shadow-gray-200/60">
          <table className="w-full">
            <thead>
              <tr className="mb-4">
                <th className="text-right px-2 py-2.5">#</th>
                <th className="text-right px-2 py-2.5">نام</th>
                <th className="text-right px-2 py-2.5">گروهی</th>
                <th className="text-right px-2 py-2.5">لیگ دارد؟</th>
                <th className="text-right px-2 py-2.5 w-auto">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {sports?.map((sport, index) => (
                <tr
                  key={sport.id}
                  className="border divide-x border-gray-200 divide-gray-200 odd:bg-gray-100 hover:bg-gray-200"
                >
                  <td className="px-3 py-1.5">{index + 1}</td>
                  <td className="px-3 py-1.5">{sport.name}</td>
                  <td className="px-3 py-1.5">
                    {sport.singular ? "فردی" : "گروهی"}
                  </td>
                  <td className="px-3 py-1.5">
                    {sport.has_leage ? "بله" : "خیر"}
                  </td>
                  <td className="px-3 py-1.5 flex gap-x-2 w-auto">
                    <button
                      className="size-8 bg-emerald-500 text-white rounded-lg grid place-items-center p-1.5"
                      onClick={() => {
                        setFormAction("UPDATE");
                        setSportSelected(sport);
                        setShowDialog(true);
                      }}
                    >
                      <Pencil className="size-5" />
                    </button>
                    <button
                      className="ize-8 bg-red-500 text-white rounded-lg grid place-items-center p-1.5"
                      onClick={() => {
                        setFormAction("DELETE");
                        setSportSelected(sport);
                        setShowDialog(true);
                      }}
                    >
                      <Trash className="size-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
