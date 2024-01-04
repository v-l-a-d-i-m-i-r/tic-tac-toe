export const Errors = {
  incorrectEmailOrPassword: 'Incorrect email or password.',
  userAlreadyExists: 'User already exists.',
  gameNotFound: 'Game not found.',
  canNotJoinGameWithState: (state: string): string => `You can not join the game with state ${state}`,
  canNotBeGuestAndCreator: 'You can not be a guest for game you created',
  gameIsNotReadyForStep: 'Game is not ready for step',
  notGuestOrCreator: 'You should be creator or guest to make step',
  canNotMakeStepAsCreator: 'You can not make step as creator. Waiting for guest`s step',
  canNotMakeStepAsGuest: 'You can not make step as guest. Waiting for creators`s step',
  cellIsNotAvailableForStep: 'Cell is not available for step',
};
