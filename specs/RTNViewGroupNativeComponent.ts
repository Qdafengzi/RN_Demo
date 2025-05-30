import type {HostComponent, ViewProps} from 'react-native';
import type {BubblingEventHandler} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

// 定义原生事件类型
type ViewGroupLoadedEvent = {
  result: 'success' | 'error';
};
export interface NativeProps extends ViewProps {
  color: string;
  onChildLoaded?: BubblingEventHandler<ViewGroupLoadedEvent> | null;
}

export default codegenNativeComponent<NativeProps>(
    'RTNViewGroup',
    {
      // 指定组件接受子节点
      interfaceOnly: true,
    }
) as HostComponent<NativeProps>;
