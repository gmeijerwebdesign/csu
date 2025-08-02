export default function CheckUser({
  setSelectedUser,
  selectedUser,
  setUserEditMode,
  setCurrentTab,
}) {
  return (
    <div className="fixed inset-0 bg-[#000000a0] flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="w-full max-w-1xl lg:max-w-4xl border shadow p-4 space-y-4 bg-white rounded">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">Gebruiker</h2>
            <p className="text-gray-500">
              {selectedUser.email.replace("@gmail.com", "")} -{" "}
              {selectedUser.role}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <label className="text-sm text-gray-600">Status</label>
            <select className="ml-2 border rounded p-1 text-sm">
              <option>Actief</option>
              <option>Inactief</option>
            </select>
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center">
          <input type="checkbox" id="toegang" className="mr-2" defaultChecked />
          <label htmlFor="toegang" className="text-sm font-medium">
            Toegang Systeem
          </label>
        </div>

        {/* Gebruikersgegevens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Gebruikersnaam</label>
            <input
              type="text"
              className="w-full border rounded p-1"
              value={selectedUser.email.replace("@gmail.com", "")}
              readOnly
            />
          </div>
          <div>
            <label className="text-sm font-medium">Wachtwoord</label>
            <input
              type="password"
              className="w-full border rounded p-1"
              value="jarko"
              readOnly
            />
          </div>
          <div>
            <label className="text-sm font-medium">Level</label>
            <select className="w-full border rounded p-1" defaultValue="4">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Afdeling</label>
            <input
              type="text"
              className="w-full border rounded p-1"
              value={selectedUser.organisation_id}
              readOnly
            />
          </div>
          <div>
            <label className="text-sm font-medium">Functie</label>
            <input
              type="text"
              className="w-full border rounded p-1"
              value={selectedUser.role}
              readOnly
            />
          </div>
        </div>

        {/* Contactgegevens */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-1">
            Contactgegevens
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="email"
              placeholder={selectedUser.email}
              className="border rounded p-1"
            />
            <input
              type="tel"
              placeholder="Telefoon"
              className="border rounded p-1"
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                className="border rounded p-1 w-full sm:w-20"
                defaultValue="2030"
              />
              <input
                type="text"
                className="border rounded p-1 flex-grow"
                defaultValue={selectedUser.email.replace("@gmail.com", "")}
              />
            </div>
          </div>
        </div>

        {/* Opmerkingen */}
        <div>
          <label className="text-sm font-medium">Opmerkingen</label>
          <textarea className="w-full border rounded p-2 h-20 resize-none"></textarea>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mt-4">
          <button
            className="border border-gray-300 rounded px-4 py-1 text-sm text-gray-600"
            disabled
          >
            Gebruiker Dupliceren
          </button>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded text-sm"
              onClick={() => {
                console.log("Wijzigen clicked");
                setUserEditMode(true);
              }}
            >
              Wijzigen
            </button>
            <button
              className="border border-gray-300 rounded px-4 py-1 text-sm text-gray-600"
              disabled
            >
              Printen
            </button>
            <button
              className="border border-gray-300 rounded px-4 py-1 text-sm text-gray-600"
              onClick={() => setSelectedUser(null)}
            >
              Sluiten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
