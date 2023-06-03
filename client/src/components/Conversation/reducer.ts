import { 
  LOADING, 
  COMPONENT,
  ADD_MESSAGE, 
  EDIT_MESSAGE, 
  ConversationActions
} from './actions';
import { 
  ConversationState, 
  Message,
  Action
} from '../../lib/types';

const initialState: ConversationState = {
  messages: [] as Message[],
  loading: false
};

export default function languageModelReducer(state = initialState, action: Action<keyof ConversationActions, typeof COMPONENT, any>): ConversationState {
  if (action.component != COMPONENT) return state
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload }
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    case EDIT_MESSAGE:
      const index = action.payload.index
      const content = action.payload.content
      const messages = state.messages
      messages[index] = {
        isUser: messages[index].isUser,
        content: content
      }
      return {
        ...state,
        messages
      }
    default:
      return state;
  }
}