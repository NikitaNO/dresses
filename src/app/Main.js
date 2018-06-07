import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, Alert, Dimensions } from 'react-native';

import DressSlide from "./components/DressSlide";
import DressSmallSlide from "./components/DressSmallSlide";
import dress from './../assets/images/dress.png';
import girl from './../assets/images/girl.png';
import trash from './../assets/images/icons/trash.png';
import checkout from './../assets/images/icons/checkout.png';
import Carousel from "react-native-snap-carousel";

const { width, height } = Dimensions.get('window');
const DRESSES = [
	{
		id: 1,
		image: dress,
	},{
		id: 2,
		image: dress,
	},{
		id: 3,
		image: dress,
	},{
		id: 4,
		image: dress,
	},{
		id: 5,
		image: dress,
	},
];

export default class Main extends React.Component {
	state = {
		trashOpacity: false,
		checkoutOpacity: false,
		dresses: DRESSES,
	};

	busy = false;

	onChangeActiveImage = index => {
		this.carousel.snapToItem(index);
		this.smallCarousel.snapToItem(index);
	};

	onSnapToPrevSlide = () => {
		this.carousel.snapToPrev();
	};

	onSnapToNextSlide = () => {
		this.carousel.snapToNext();
	};

	handleOnMoveImageEvent = (styles) => {

		if (styles.top < -130) {
			if (styles.left > 120 && !this.busy) {
				this.busy = true;
				this.setState({
					checkoutOpacity: true
				})
			}
			if (styles.left < -130 && !this.busy) {
				this.busy = true;
				this.setState({
					trashOpacity: true
				})
			}
		} else {
			this.setState({
				checkoutOpacity: false,
				trashOpacity: false,
			});
			this.busy = false;
		}

	};

	handleOnReleaseImageEvent = (styles, index) => {
		if (styles.top < -130) {
			if (styles.left > 120) {
				this.busy = true;
				Alert.alert(
					'Alert',
					'Move to checkout?',
					[
						{
							text: 'Move',
							onPress: () => console.log('Moved to checkout'),
						},
						{
							text: 'Cancel',
							onPress: () => console.log('Cancel Pressed'),
						},
					],
					{ cancelable: false }
				)
			}
			if (styles.left < -130) {
				Alert.alert(
					'Alert',
					'Move to trash',
					[
						{
							text: 'Move',
							onPress: () => {
								const { dresses } = this.state;
								const editedDresses = dresses.filter(dress => dress.id !== index);

								this.setState({ dresses: editedDresses});
							},
						},
						{
							text: 'Cancel',
							onPress: () => console.log('Cancel Pressed'),
						},
					],
					{ cancelable: false }
				)
			}
		}
	};

	render() {
		const { trashOpacity, checkoutOpacity, dresses } = this.state;

		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Image
						style={[styles.icon, trashOpacity ? { opacity: .5 } : {}]}
						resizeMode="cover"
						source={trash}
					/>
					<Text>Title</Text>
					<Image
						style={[styles.icon, checkoutOpacity ? { opacity: .5 } : {}]}
						resizeMode="cover"
						source={checkout}
					/>
				</View>
				<View style={{ flex: .85 }}>
					<View style={styles.womenContainer}>
						<Image
							style={{ width: width, height: height - 100 }}
							resizeMode="contain"
							source={girl}
						/>
					</View>
					<Carousel
						containerCustomStyle={styles.fullSize}
						containerContainerStyle={styles.carouselContainer}
						ref={c => this.carousel = c}
						data={dresses}
						renderItem={({item}) => (
							<DressSlide
								image={item.image}
								index={item.id}
								moveImage={this.handleOnMoveImageEvent}
								releaseImage={this.handleOnReleaseImageEvent}
							/>
						)}
						layoutCardOffset={99}
						sliderWidth={width}
						itemWidth={200}
						scrollEnabled={false}
						onBeforeSnapToItem={this.onChangeActiveImage}
					/>
					<TouchableOpacity
						style={[styles.carouselButton, { left: 0 }]}
						onPress={this.onSnapToPrevSlide} />
					<TouchableOpacity
						style={[styles.carouselButton, { right: 0 }]}
						onPress={this.onSnapToNextSlide} />
				</View>
				<View style={styles.footerCarousel}>
					<Carousel
						ref={c =>  this.smallCarousel = c}
						data={dresses}
						renderItem={({item, index}) => (
							<DressSmallSlide
								image={item.image}
								index={index}
								changeItemIndex={this.onChangeActiveImage}/>
						)}
						layoutCardOffset={99}
						sliderWidth={450}
						itemWidth={70}
						scrollEnabled={true}
						onBeforeSnapToItem={this.onChangeActiveImage}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'stretch',
		justifyContent: 'center',
		paddingTop: 30,
	},
	header: {
		position: 'absolute',
		top: 30,
		left: 0,
		right: 0,
		height: 50,
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,.4)',
		zIndex: 2,
	},
	womenContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		zIndex: -2,
	},
	fullSize: {
		flex: 1,
	},
	carouselContainer: {
		zIndex: 2,
		flex: 1,
		overflow: 'visible',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 200,
		height: 300,
	},
	footerCarousel: {
		flex: .15,
		zIndex: 2,
	},
	carouselButton: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		width: 30,
		zIndex: 4,
	},
	icon: {
		width: 30,
		height: 30,
	}
});
