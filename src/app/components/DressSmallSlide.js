import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

const DressSmallSlide = ({image, index, changeItemIndex}) => (
	<TouchableOpacity
		onPress={() => changeItemIndex(index)}
		style={styles.container}
	>
		<Image
			resizeMode="contain"
			style={styles.image}
			source={image}
		/>
	</TouchableOpacity>
);



const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		maxWidth: 50,
		maxHeight: 100,
	},
});

export default DressSmallSlide