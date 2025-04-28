import type {HostComponent,ViewProps} from 'react-native';
import { BubblingEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type TextLoadedEvent = {
  result: 'success' | 'error';
};

export interface NativeProps extends ViewProps {
  text?: string;
  onScriptLoaded?: BubblingEventHandler<TextLoadedEvent> | null;
}

export default codegenNativeComponent<NativeProps>(
  'CenteredText',
) as HostComponent<NativeProps>;