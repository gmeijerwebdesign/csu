import React from "react";

export default function AllUsers({
  teamProfiles,
  profile,
  setSelectedUser,
  selectedUser,
  setCurrentTab,
}) {
  return (
    <div className=" space-y-4">
      <p className="text-sm text-gray-600">
        Je ziet hier alle profielen met dezelfde organisatie als jij (
        {profile.organisation_id}).
      </p>

      {teamProfiles && teamProfiles.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border divide-y divide-gray-200">
            <thead className="bg-[#ebf1ff]">
              <tr>
                {[
                  "status",
                  "medewerker ID",
                  "naam",
                  "functienaam",
                  "afdeling ID",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border border-gray-200"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y border-collapse divide-gray-100">
              {teamProfiles.map((p) => {
                const isSelected = selectedUser?.id === p.id;
                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-gray-50 cursor-pointer ${
                      isSelected ? "bg-blue-50" : ""
                    }`}
                    onClick={() => {
                      setSelectedUser(p);
                    }}
                  >
                    <td className="px-3 py-2 border border-gray-300">actief</td>
                    <td className="px-3 py-2 border border-gray-300">
                      {p.full_name || p.id}
                    </td>
                    <td className="px-3 py-2 border border-gray-300">
                      {p.email || "-"}
                    </td>
                    <td className="px-3 py-2 border border-gray-300">
                      {p.role}
                    </td>
                    <td className="px-3 py-2 border border-gray-300">
                      {p.organisation_id}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Geen gebruikers gevonden in jouw organisatie.</p>
      )}
    </div>
  );
}
