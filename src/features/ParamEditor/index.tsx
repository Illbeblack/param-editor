import { useState, forwardRef, useImperativeHandle } from 'react';
import { Model, Props } from '../../shared/type';
const ParamEditor = forwardRef(({ params, model }: Props, ref) => {
  const [currentModel, setCurrentModel] = useState<Model>(model);

  const handleInputChange = (paramId: number, value: string) => {
    const updatedParamValues = currentModel.paramValues.map((paramValue) =>
      paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
    );
    setCurrentModel({ ...currentModel, paramValues: updatedParamValues });
  };

  const handleColorChange = (index: number, value: string) => {
    const updatedColors = currentModel.colors.map((color, i) =>
      i === index ? { ...color, name: value } : color
    );
    setCurrentModel({ ...currentModel, colors: updatedColors });
  };

  useImperativeHandle(ref, () => ({
    getModel: (): Model => {
      return currentModel;
    },
  }));

  return (
    <div>
      <h1>Редактор параметров</h1>
      {params.map((param) => (
        <div key={param.id}>
          <label>{param.name}</label>
          <input
            type="text"
            value={
              currentModel.paramValues.find(
                (value) => value.paramId === param.id
              )?.value || ''
            }
            onChange={(e) => handleInputChange(param.id, e.target.value)}
          />
        </div>
      ))}
      <h2>Редактирование цветов</h2>
      {currentModel.colors.map((color, index) => (
        <div key={index}>
          <label>Color {index + 1}</label>
          <input
            type="text"
            value={color.colorName}
            onChange={(e) => handleColorChange(index, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
});

export default ParamEditor;
