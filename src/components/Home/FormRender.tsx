import { HiX } from "react-icons/hi";

type Props = {
  formItems: FormItem[];
  removeFormItem: (itemIndex: number) => void;
};

const FormRender = ({ formItems, removeFormItem }: Props) => {
    console.log(formItems);
    
  return (
    <div className={`grid gap-6`}>
      <h1 className={`text-xl mt-8 mb-4 text-center font-bold`}>Formulário:</h1>

      {formItems.length === 0 && (
        <p className={`text-sm mt-8 mb-4 text-center`}>
          Nenhum ítem foi adicionado...😢
        </p>
      )}

      {formItems.map((formItem, index) => (
        <div
          key={index + "_"}
          className={`grid gap-8 bg-white p-4 rounded-xl shadow-lg shadow-blue-700/10 relative`}
        >
          {formItem.answerType === "texto" && (
            <label key={`${index}_in`} className={`grid gap-2`}>
              <span className={`font-bold`}>{formItem.text}</span>
              <input
                className={`rounded-xl p-2 py-0.5 border-2 border-gray-300 focus:border-blue-500`}
                type="text"
              />
            </label>
          )}
          {formItem.answerType === "multipla" && (
            <label key={`${index}_ch`}>
              <span className={`font-bold`}>{formItem.text}</span>
              {formItem?.options?.map((option, i) => (
                <label key={i + 800} className={`flex gap-2 cursor-pointer`}>
                  <input type="checkbox" value={option} />
                  <span>{option}</span>
                </label>
              ))}
            </label>
          )}
          {formItem.answerType === "unica" && (
            <label key={`${index}_ra`}>
              <span className={`font-bold`}>{formItem.text}</span>
              {formItem?.options?.map((option, i) => (
                <label key={i + "__"} className={`flex gap-2 cursor-pointer`}>
                  <input type="radio" name={`${index}_opt`} />
                  <span>{option}</span>
                </label>
              ))}
            </label>
          )}
          <span
            className={`bg-red-500 p-1 rounded-full text-white hover:bg-white hover:text-red-500 cursor-pointer
                            transition-default absolute right-2 top-2`}
            onClick={() => removeFormItem(index)}
          >
            <HiX size={15} />
          </span>
        </div>
      ))}
    </div>
  );
};
export default FormRender;
