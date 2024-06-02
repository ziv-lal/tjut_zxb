import { ProLayoutProps } from '@ant-design/pro-components';

const Settings: ProLayoutProps & {
    pwa?: boolean;
    logo?: string;
    } = {
    fixSiderbar: true,
};

export default Settings;
