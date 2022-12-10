import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import FormRender from "./components/Home/FormRender";
import ListOptionsRender from "./components/Home/ListOptionsRender";
import useListOptions from "./hooks/useListOptions";
import MainLayout from "./layouts/MainLayout";
import { capitalize } from "./utils/textUtils";

type Inputs = {
  text: string;
  answerType: string;
};

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const items: FormItem = {
      text: data.text,
      answerType: data.answerType,
    };

    const questionAlreadyAsked = formItems.find(
      (item) => item.text === data.text
    );

    if (questionAlreadyAsked) return;

    if (listOptions[0] !== "" && data.answerType !== "texto") {
      items.options = listOptions.filter((option) => option !== "");
    }

    if (items?.options && items.options.length < 1) return;

    setFormItems([...formItems, items]);

    clearListOptions();
  };

  const [isListOptions, setIsListOptions] = useState(false);

  const {
    listOptions,
    handleListOption,
    addListOption,
    removeListOption,
    clearListOptions,
  } = useListOptions();

  // const [formItems, setFormItems] = useState<FormItem[]>([]);
  const [formItems, setFormItems] = useState<FormItem[]>([
    { text: "Qual o seu nome?", answerType: "texto" },
    {
      text: "Você Fuma?",
      answerType: "unica",
      options: ["SIM", "NÃO", "Prefiro Não Dizer"],
    },
    {
      text: "Quais dos seus parentes já sentiram esses sintomas?",
      answerType: "multipla",
      options: ["PAIS", "MÃE", "TIOS", "FILHOS", "Outros"],
    },
  ]);

  const removeFormItem = (itemIndex: number) => {
    const updatedFormItems = formItems.filter(
      (_, index) => index !== itemIndex
    );

    setFormItems([...updatedFormItems]);
  };
  // console.log(formItems);
  // console.log(JSON.stringify(formItems));

  const answerType = watch("answerType");

  useEffect(() => {
    setIsListOptions(false);

    if (answerType === "multipla" || answerType === "unica") {
      setIsListOptions(true);
    }
  }, [answerType]);

  return (
    <MainLayout>
      <div className="w-[95%] max-w-3xl mx-auto text-slate-700 bg-white p-2 pb-8 px-8 rounded-xl text-sm md:text-md">
        <img src="/assets/forms-vector.png" alt="" className={`w-full md:w-72 mx-auto pb-8`}/>

        <h1 className={`text-xl md:text-2xl mt-8 mb-4 text-center font-bold`}>
          Cadastrar Formulário
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`flex flex-col gap-4 bg-gradient-to-tr from-slate-800 to-slate-600 p-4 pb-6 rounded-xl`}
        >
          <label className={`grid`}>
            <span className={`font-bold text-white mb-1`}>Pergunta:</span>
            <input
              className={`rounded-xl p-2 py-0.5 border-2 border-gray-300 focus:border-blue-500`}
              {...register("text", { required: true })}
              placeholder="Qual o seu nome?"
            />
          </label>
          {errors.text && (
            <span className={`text-red-500 text-sm`}>
              This field is required
            </span>
          )}

          <label className={`grid`}>
            <span className={`font-bold text-white mb-1`}>Tipo de Resposta:</span>
            <select
              className={`rounded-xl p-2 py-0.5 border-2 border-gray-300 focus:border-blue-500`}
              {...register("answerType", { required: true })}
            >
              {["texto", "multipla", "unica"].map((item) => (
                <option value={item} key={item}>
                  {capitalize(item)}
                </option>
              ))}
            </select>
          </label>
          {errors.answerType && (
            <span className={`text-red-500 text-sm`}>
              This field is required
            </span>
          )}

          {isListOptions && (
            <ListOptionsRender
              listOptions={listOptions}
              addListOption={addListOption}
              removeListOption={removeListOption}
              handleListOption={handleListOption}
            />
          )}

          <button
            className={`bg-gradient-to-tr from-blue-500 to-sky-300 text-white font-bold rounded-xl
                          w-48 px-4 py-2 mt-4`}
          >
            Adicionar ítem
          </button>
        </form>

        {/* Divider */}
        <div className={`flex items-center justify-center w-full mt-12 gap-4`}>
          <hr className={`flex-1`} />
          <span className={`text-xs text-slate-400`}>Pré-visualização</span>
          <hr className={`flex-1`} />
        </div>

        {/* Form render */}

        <FormRender formItems={formItems} removeFormItem={removeFormItem} />

        {formItems.length > 0 && (
          <button
            className={`bg-gradient-to-tr from-slate-800 to-slate-500 text-white font-bold rounded-xl
                  w-48 px-4 py-2 mt-4 text-sm`}
          >
            Enviar Respostas
          </button>
        )}
      </div>
    </MainLayout>
  );
}

export default App;
