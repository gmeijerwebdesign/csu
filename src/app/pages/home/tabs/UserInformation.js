import React from "react";

const leaveData = [
  {
    year: 2019,
    baseLeave: 66.7,
    statutoryLeave: 25,
    advHours: 0,
    compensations: 0,
    carryOverLastYear: 6.25,
    leaveTaken: 2.65,
    adjusted: 40,
    startBalance: 137.95,
  },
  {
    year: 2018,
    baseLeave: 160,
    statutoryLeave: 60,
    advHours: 0,
    compensations: 0,
    carryOverLastYear: 8,
    leaveTaken: 9,
    adjusted: 0,
    startBalance: 229,
  },
  {
    year: 2017,
    baseLeave: 160,
    statutoryLeave: 60,
    advHours: 0,
    compensations: 0,
    carryOverLastYear: 0,
    leaveTaken: 34.75,
    adjusted: 0,
    startBalance: 262.75,
  },
  {
    year: 2016,
    baseLeave: 268,
    statutoryLeave: 0,
    advHours: 0,
    compensations: 0,
    carryOverLastYear: 0,
    leaveTaken: 0,
    adjusted: 0,
    startBalance: 268,
  },
];

export default function UserInformation({ profile }) {
  // fallback als er geen profile is
  if (!profile) return null;
  return (
    <div className="max-w-[1200px] mx-auto p-6 space-y-6 font-sans">
      {/* Top header with basic identification */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white shadow rounded-lg p-6">
        <div className="flex flex-col space-y-2">
          <div className="text-sm text-gray-500">In dienst op</div>
          <div className="font-medium">01-01-2011</div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="text-sm text-gray-500">Naam</div>
          <div className="flex gap-2 flex-wrap">
            <div className="bg-gray-100 px-3 py-1 rounded">
              Voornaam: {profile.email.replace("@gmail.com", "")}
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded">
              Tussenvoegsel: van
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded">
              Achternaam: Dijk
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded">
              Geboortedatum: 20-2-1986
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="text-sm text-gray-500">Contractinformatie</div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs text-gray-500">Contracturen</div>
              <div className="font-medium">40,0</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Pers ID</div>
              <div className="font-medium">80201771</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Functie</div>
              <div className="font-medium">
                {profile.role} Bedrijfsadministratie
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Leidinggevende</div>
              <div className="font-medium">Peters, H.J.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary section: employment details, preferences, codes */}
      <div className="bg-white shadow rounded-lg p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Eigen / Inhuur</div>
          <div className="font-medium">Eigen</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Direct / indirect</div>
          <div className="font-medium">Indirect</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Kostencode</div>
          <div className="font-medium">12220</div>
        </div>
      </div>

      {/* Preferences & codes area (simplified) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
          <div className="text-sm font-semibold mb-2">Tariefcodes</div>
          <div className="flex-1 text-xs text-gray-500">
            Voeg een nieuw tarief toe
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
          <div className="text-sm font-semibold mb-2">Reiskostenvergoeding</div>
          <div className="flex-1 text-xs text-gray-500">
            Voeg een nieuwe voorkeurover toe
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
          <div className="text-sm font-semibold mb-2">
            Voorkeur Uitbetaling Overuren
          </div>
          <div className="flex-1 text-xs text-gray-500">
            23-11-2015 Tijd voor Tijd
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
          <div className="text-sm font-semibold mb-2">Online Urencodes</div>
          <div className="flex-1 text-xs text-gray-500">
            Voeg een nieuwe urencode toe
          </div>
        </div>
      </div>

      {/* Leave overview table */}
      <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold">
            Verlofoverzicht / Opbouw Verlof
          </div>
          <div className="text-sm text-gray-500">1 van 1</div>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left">Jaar</th>
                <th className="px-3 py-2 text-left">Basis Verlof</th>
                <th className="px-3 py-2 text-left">Bovenwettelijk Verlof</th>
                <th className="px-3 py-2 text-left">ADV Uren</th>
                <th className="px-3 py-2 text-left">Compensatie Wachtlijst</th>
                <th className="px-3 py-2 text-left">Inhaaluren vorig jaar</th>
                <th className="px-3 py-2 text-left">
                  Verlof tegoed vorig jaar
                </th>
                <th className="px-3 py-2 text-left">Uren Bijgeboekt</th>
                <th className="px-3 py-2 text-left">Start saldo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leaveData.map((row) => (
                <tr key={row.year} className="hover:bg-gray-50">
                  <td className="px-3 py-2">{row.year}</td>
                  <td className="px-3 py-2">{row.baseLeave.toFixed(2)}</td>
                  <td className="px-3 py-2">{row.statutoryLeave.toFixed(2)}</td>
                  <td className="px-3 py-2">{row.advHours.toFixed(2)}</td>
                  <td className="px-3 py-2">{row.compensations.toFixed(2)}</td>
                  <td className="px-3 py-2">
                    {row.carryOverLastYear.toFixed(2)}
                  </td>
                  <td className="px-3 py-2">{row.leaveTaken.toFixed(2)}</td>
                  <td className="px-3 py-2">{row.adjusted.toFixed(2)}</td>
                  <td className="px-3 py-2 font-medium">
                    {row.startBalance.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Documents / Upload section */}
      <div className="bg-white shadow rounded-lg p-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="text-lg font-semibold mb-2">Documenten</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded p-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Legitimatie</div>
                <div className="text-xs text-gray-500">Geen bestand</div>
              </div>
              <button className="text-sm px-3 py-1 bg-blue-600 text-white rounded">
                Upload
              </button>
            </div>
            <div className="col-span-1 md:col-span-2 border-dashed border-2 border-gray-300 rounded flex items-center justify-center p-6">
              <div className="text-center text-gray-500">
                Klik hier om een bijlage toe te voegen
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col justify-between">
          <div className="text-sm text-gray-500">Opmerkingen</div>
          <div className="p-3 border rounded bg-gray-50 flex-1">
            Per 01-06-19 uit dienst
          </div>
        </div>
      </div>
    </div>
  );
}
