import { StyleSheet } from 'react-native';

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: '20%',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#b42025',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cameraToggle: {
    position: 'absolute',
    top: 20,
    right: 20, // Adjust the right property for padding end
    color: 'white',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 10,
    width: 75,
    height: 75,
    backgroundColor: 'white',
    borderRadius: 75,
  },
  PhotoButtonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
  },
  PhotoButtons: {
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: 'white',
    margin: 30,
    width: '35%',
  },
  photoText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    padding: 12,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
});
