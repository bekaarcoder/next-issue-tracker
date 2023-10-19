import { Text } from '@radix-ui/themes';
import React, { PropsWithChildren } from 'react';

const ErrorMessage = ({ children }: PropsWithChildren) => {
    if (!children) return null;
    return (
        <Text color="crimson" as="p" className="text-sm">
            {children}
        </Text>
    );
};

export default ErrorMessage;
