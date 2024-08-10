import { useState } from 'react';

export default function CreateModal({ onCreate, onClose }) {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleCreate = () => {
    if (groupName && selectedColor) {
      onCreate({ name: groupName, color: selectedColor });
      console.log(groupName, selectedColor);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white-500 bg-opacity-10 backdrop-filter backdrop-brightness-25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-11/12 min-h-[200px] max-w-[450px] rounded-lg bg-white p-6 flex flex-col gap-3"
      >
        <h2 className="font-bold">Create New Group</h2>
        <div className="flex items-center justify-between gap-6">
          <h3 className="font-bold">Group Name</h3>
          <input
            placeholder="Enter Group Name"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="flex-1 rounded-3xl p-1 px-2 text-sm border border-black"
          />
        </div>
        <div className="flex gap-8 items-center">
          <h4 className="font-bold">Choose Color</h4>
          <div className="colors flex gap-2">
            {['748b86', '26d9cf', 'b84792', '9d626a', '313ece', 'ffcf00'].map(
              (color) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: `#${color}` }}
                  className={`h-[2rem] w-[2rem] rounded-full cursor-pointer  ${selectedColor === color ? 'ring-2 ring-black' : ''}`}
                />
              )
            )}
          </div>
        </div>
        <button onClick={handleCreate} className="px-3 py-1 bg-blue-700 rounded-md text-white w-[fit-content] self-end">
          Create
        </button>
      </div>
    </div>
  );
}

