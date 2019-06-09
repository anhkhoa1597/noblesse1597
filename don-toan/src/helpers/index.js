export function channingActions(currentActions, dispatch, ...actionGenerators) {
  return actionGenerators.reduce((accActions, actionGenerator) => {
    return {
      ...actionGenerator(accActions, dispatch)
    };
  }, currentActions);
}
