import type {HostComponent,ViewProps} from 'react-native';
import { BubblingEventHandler, Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type SlideComposeChangedEvent = {
  progress: Int32;
};

export interface NativeProps extends ViewProps {
  text?: string;
  min?: Int32;
  max?: Int32;
  value?: Int32;
  onProgress?: BubblingEventHandler<SlideComposeChangedEvent> | null;
}

export default codegenNativeComponent<NativeProps>(
  'RTNSliderCompose',
) as HostComponent<NativeProps>;
