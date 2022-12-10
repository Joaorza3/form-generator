import { HiTrash } from "react-icons/hi";

type Props = {
  listOptions: string[];
  addListOption: () => void;
  removeListOption: (optionIndex: number) => void;
  handleListOption: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
};

const ListOptionsRender = ({
  listOptions,
  addListOption,
  removeListOption,
  handleListOption,
}: Props) => {
  return (
    <div
      className={`w-full bg-gradient-to-tr from-slate-800 to-slate-600 p-4 pb-6 rounded-xl`}
    >
      <div className={`flex justify-between my-4`}>
        <h2 className={`font-bold text-white`}>Lista de Opções: </h2>
        <button
          type="button"
          className={`bg-gradient-to-tr from-green-500 to-lime-400 text-white font-bold rounded-xl
                        w-48 px-4 py-2 text-sm`}
          onClick={() => addListOption()}
        >
          Adicionar Opção
        </button>
      </div>
      <ul className={`grid gap-2 w-full`}>
        {listOptions.map((option, index) => (
          <li
            key={`${index}_cbx`}
            className={`flex gap-2 items-center justify-between`}
          >
            <input
              className={`rounded-xl p-2 py-0.5 border-2 border-gray-300 focus:border-blue-500 w-full`}
              type="text"
              value={listOptions[index]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleListOption(e, index)
              }
            />
            {index > 0 && (
              <span
                className={`bg-red-500 p-1  rounded-xl text-white hover:bg-white hover:text-red-500 cursor-pointer
                            transition-default`}
                onClick={() => removeListOption(index)}
              >
                <HiTrash size={25} />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ListOptionsRender;
