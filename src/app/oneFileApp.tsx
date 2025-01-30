import React, { useState, forwardRef, useImperativeHandle } from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  name: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

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
            value={color.name}
            onChange={(e) => handleColorChange(index, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
});

const params: Param[] = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
  ],
  colors: [{ name: 'red' }, { name: 'green' }, { name: 'blue' }],
};

const oneFileApp: React.FC = () => {
  const paramEditorRef = React.createRef<{ getModel: () => Model }>();

  const handleGetModel = () => {
    if (paramEditorRef.current) {
      const updatedModel = paramEditorRef.current.getModel();
      console.log('Updated Model:', updatedModel);
    }
  };

  return (
    <div>
      <ParamEditor ref={paramEditorRef} params={params} model={model} />
      <button onClick={handleGetModel}>Get Model</button>
    </div>
  );
};

export default oneFileApp;
