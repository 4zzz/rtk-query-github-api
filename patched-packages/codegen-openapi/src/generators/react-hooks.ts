import ts from 'typescript';
//import { getOperationName } from '../../patched-packages/oazapfts/lib/codegen/generate';
import { capitalize, isQuery } from '../utils';
import type { OperationDefinition, EndpointOverrides } from '../types';
import { getOverrides } from '../generate';
import { factory } from '../utils/factory';

type GetReactHookNameParams = {
  operationDefinition: OperationDefinition;
  endpointOverrides: EndpointOverrides[] | undefined;
};

function getOperationName(verb: string, path: string, operationId: string) {
  //return _getOperationName(verb, path, operation.operationId);
  const n = operationId!.split('/');
  if (!n) throw new Error();
  if (n.length !== 2) throw new Error();
  const camelize = (prev: string, curr: string) => prev + capitalize(curr);
  const pre = n[0].split('-').reduce(camelize);
  const name = n[1].split('-').reduce(camelize);

  const res = pre + capitalize(name);
  return res;
}

const getReactHookName = ({
  operationDefinition: { verb, path, operation },
  operationDefinition,
  endpointOverrides,
}: GetReactHookNameParams) => {
  const overrides = getOverrides(operationDefinition, endpointOverrides);

  return factory.createBindingElement(
    undefined,
    undefined,
    factory.createIdentifier(
      `use${capitalize(getOperationName(verb, path, operation.operationId!))}${
        isQuery(verb, overrides) ? 'Query' : 'Mutation'
      }`
    ),
    undefined
  );
};

type GenerateReactHooksParams = {
  exportName: string;
  operationDefinitions: OperationDefinition[];
  endpointOverrides: EndpointOverrides[] | undefined;
};
export const generateReactHooks = ({ exportName, operationDefinitions, endpointOverrides }: GenerateReactHooksParams) =>
  factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createObjectBindingPattern(
            operationDefinitions.map((operationDefinition) =>
              getReactHookName({ operationDefinition, endpointOverrides })
            )
          ),
          undefined,
          undefined,
          factory.createIdentifier(exportName)
        ),
      ],
      ts.NodeFlags.Const
    )
  );
