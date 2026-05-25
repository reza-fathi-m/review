"use client";
import React, { useEffect, useState } from "react";

export default function SportsPage() {
  const [sports, setSports] = useState([]);
  const [sportSelected, setSportSelected] = useState({
    name: "",
    singular: false,
    has_leage: true,
    id: "",
  });
  const fetchAllSports = async () => {
    const res = await fetch("http://localhost:3001/sports");
    if (res.ok) {
      const data = await res.json();
      setSports(data);
    }
  };
  useEffect(() => {
    fetchAllSports();
  }, []);

  useEffect(() => {
    console.log(sportSelected);
  }, [sportSelected]);

  return (
    <>
      <div className="fixed bg-black/60 backdrop-blur-sm z-999 w-full min-h-screen h-screen top-0 right-0 grid place-items-center">
        <div className="w-9/10 lg:w-120 p-8 bg-white rounded-xl divide-y divide-gray-200">
          <h1 className="text-2xl font-black text-center pb-6">افزودن ورزش</h1>
          <div className="pt-4">
            <form action="" className="grid gap-y-6">
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
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="bg-white flex justify-between p-4 rounded-lg shadow-xl shadow-gray-200/60">
          <h3 className="text-2xl font-bold">ورزش ها</h3>
          <button className="bg-blue-600 text-white px-4.5 py-1.5 rounded-md hover:bg-blue-700 transition-colors duration-200 ease-linear cursor-pointer">
            + افزودن
          </button>
        </div>
        <div className="bg-white  p-4 rounded-lg shadow-xl shadow-gray-200/60">
          <table className="w-full">
            <thead>
              <tr className="border divide-x border-gray-200 divide-gray-200">
                <th className="text-right px-2 py-1">#</th>
                <th className="text-right px-2 py-1">نام</th>
                <th className="text-right px-2 py-1">گروهی</th>
                <th className="text-right px-2 py-1">لیگ دارد؟</th>
                <th className="text-right px-2 py-1">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {sports?.map((sport, index) => (
                <tr
                  key={sport.id}
                  className="border divide-x border-gray-200 divide-gray-200"
                >
                  <td className="px-3 py-1.5">{index + 1}</td>
                  <td className="px-3 py-1.5">{sport.name}</td>
                  <td className="px-3 py-1.5">
                    {sport.singular ? "فردی" : "گروهی"}
                  </td>
                  <td className="px-3 py-1.5">
                    {sport.has_leage ? "بله" : "خیر"}
                  </td>
                  <td className="px-3 py-1.5"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
