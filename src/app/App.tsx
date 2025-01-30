import React from 'react';
import { Model, Param } from '../shared/type';
import ParamEditor from '../features/ParamEditor';

const params: Param[] = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
  ],
  colors: [{ colorName: 'red' }, { colorName: 'green' }, { colorName: 'blue' }],
};

const App: React.FC = () => {
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

export default App;
