"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import RadioButton from "@/components/ui/radio-button";
import Checkbox from "@/components/ui/checkbox";
import Slider from "@/components/ui/slider";
import Input from "@/components/ui/input";
import TextArea from "@/components/ui/textarea";

export default function Home() {
  const [kategori, setKategori] = useState("");
  const [jenis, setJenis] = useState("masuk");
  const [tersedia, setTersedia] = useState(false);
  const [jumlah, setJumlah] = useState(50);
  const [nama, setNama] = useState("");
  const [catatan, setCatatan] = useState("");

  function handleSubmit() {
    alert(
      [
        "Nama Barang: " + nama,
        "Kategori: " + kategori,
        "Jenis: " + jenis,
        "Jumlah: " + jumlah,
        "Tersedia: " + (tersedia ? "Ya" : "Tidak"),
        "Catatan: " + catatan,
      ].join("\n")
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Base Components
          </h1>

          <p className="mt-2 text-gray-600">
            Komponen formulir dan input
          </p>
        </div>

        <div className="space-y-6 rounded-xl bg-white p-6 shadow-md">

          <hr />

          <section>
            <h2 className="mb-3 text-lg font-semibold">
               Dropdown
            </h2>

            <Dropdown
              label="Kategori Barang"
              name="kategori"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              options={[
                { value: "makanan", label: "Makanan" },
                { value: "minuman", label: "Minuman" },
                { value: "kebersihan", label: "Perlengkapan Kebersihan" },
                { value: "lainnya", label: "Lainnya" },
              ]}
            />
          </section>

          <hr />

          <section>
            <h2 className="mb-3 text-lg font-semibold">
               Radio Button
            </h2>

            <div className="flex gap-6">
              <RadioButton
                label="Barang Masuk"
                name="jenis"
                value="masuk"
                checked={jenis === "masuk"}
                onChange={(e) => setJenis(e.target.value)}
              />

              <RadioButton
                label="Barang Keluar"
                name="jenis"
                value="keluar"
                checked={jenis === "keluar"}
                onChange={(e) => setJenis(e.target.value)}
              />
            </div>
          </section>

          <hr />

          <section>
            <h2 className="mb-3 text-lg font-semibold">
               Checkbox
            </h2>

            <Checkbox
              label="Barang tersedia"
              name="tersedia"
              checked={tersedia}
              onChange={(e) => setTersedia(e.target.checked)}
            />
          </section>

          <hr />

          <section>
            <h2 className="mb-3 text-lg font-semibold">
               Slider
            </h2>

            <Slider
              label="Jumlah Stok"
              name="jumlah"
              min={0}
              max={100}
              value={jumlah}
              onChange={(e) => setJumlah(Number(e.target.value))}
            />
          </section>

          <hr />

          <section>
            <h2 className="mb-3 text-lg font-semibold">
               Text Input
            </h2>

            <Input
              label="Nama Barang"
              name="nama"
              placeholder="Masukkan nama barang"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </section>

          <hr />

          <section>
            <h2 className="mb-3 text-lg font-semibold">
               Text Area
            </h2>

            <TextArea
              label="Catatan Barang"
              name="catatan"
              placeholder="Masukkan catatan barang"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              rows={4}
            />
          </section>

          <hr />

          <Button onClick={handleSubmit}>
            Simpan Semua Data
          </Button>

        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Komponen formulir dan input
        </p>

      </div>
    </main>
  );
}