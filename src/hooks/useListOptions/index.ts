import { useState } from "react";

const useCheckBox = () => {
  const [listOptions, setListOptions] = useState<string[]>([""]);

  const handleListOption = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedListOptions = listOptions;

    updatedListOptions[index] = e.target.value;

    setListOptions([...updatedListOptions]);
  };

  const addListOption = () => {
    setListOptions([...listOptions, ""]);
  };

  const removeListOption = (optionIndex: number) => {
    const updatedlistOptions = listOptions.filter(
      (_, index) => index !== optionIndex
    );

    setListOptions([...updatedlistOptions]);
  };

  const clearListOptions = () => {
    setListOptions([""]);
  };

  return {
    listOptions,
    handleListOption,
    addListOption,
    removeListOption,
    clearListOptions,
  };
};
export default useCheckBox;
