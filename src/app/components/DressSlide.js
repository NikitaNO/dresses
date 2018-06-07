import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import Gestures from 'react-native-easy-gestures';

const DressSlide = ({image, index, moveImage, releaseImage}) => (
	<View style={styles.container}>
		<Gestures
			scalable={{min: 0.1, max: 7}}
			onChange={(event, styles) => moveImage(styles, index)}
			onRelease={(event, styles) => releaseImage(styles, index)}
		>
			<Image
				style={styles.image}
				resizeMode="contain"
				source={image}
			/>
		</Gestures>
	</View>
);



const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		maxWidth: 300,
		maxHeight: 400,
	},
});

export default DressSlide