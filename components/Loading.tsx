import { View, Text, ActivityIndicator, StyleSheet, Modal } from 'react-native';

type LoadingProps = {
    visible: boolean;
    message?: string;
    color?: string;
    size?: 'small' | 'large' | number;
    overlayColor?: string;
};

export function Loading({
    visible,
    message,
    color = '#0f766e',
    size = 'large',
    overlayColor = 'rgba(0, 0, 0, 0.4)'
}: LoadingProps) {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={() => { }}
        >
            <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
                <View style={styles.container}>
                    <ActivityIndicator
                        size={size}
                        color={color}
                    />
                    <Text style={styles.text}>
                        {message || 'Carregando...'}
                    </Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    container: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
        gap: 12,
        elevation: 4,
    },
    text: {
        fontSize: 16,
        color: '#0f172a',
    },
});