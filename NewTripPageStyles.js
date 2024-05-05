import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    scrollView: {
    // flex: 1,
    },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#1B191B',
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'contain' to keep aspect ratio
  },
  formContainer: {
    flex: 1,
    padding: 35,
  },
  header: {
    height: 40,
    borderColor: '#59585A',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8, // Rounded corners for inputs
    fontSize: 20,
    color: 'white',
    fontFamily: 'AnonymousPro-Bold',
  },
  input: {
    height: 40,
    borderColor: '#434343',
    paddingHorizontal: 10,
    borderRadius: 8, // Rounded corners for inputs
    fontSize: 16,
    fontFamily: 'AnonymousPro-Bold',
    width: 300,
  },
  picker: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8, // Rounded corners for pickers
  },
  label: {
    height: 30,
    fontSize: 16,
    color: '#434343',
    marginBottom: 10,
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 10, // Padding on the sides
    paddingVertical: 5, // Padding on top and bottom
    borderRadius: 8, // Rounded corners for labels
    borderWidth: 2,
    borderColor: '#434343',
    fontFamily: 'AnonymousPro-Bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10, // Keep rounded corners for result container
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#434343',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 20, // Set your desired size
    fontFamily: 'AnonymousPro-Bold',
  },
  resultText: {
    fontSize: 16,
    color: '#193654',
    padding: 5,
    fontFamily: 'AnonymousPro-Bold',
  },
  weatherContainer: {
    backgroundColor: 'white', // Light grey background
    padding: 20,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
},
weatherHeader: {
    fontSize: 18,
    fontFamily: 'AnonymousPro-Bold',
    marginBottom: 10,
    color: '#333', // Dark grey text for better readability
},
weatherText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333', // Medium grey text for less emphasis elements
    fontFamily: 'AnonymousPro-Bold',
},
centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 22,
    marginBottom: 68,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',  // This sets the modal width to 90% of the screen width
    maxHeight: '80%',  // This sets the modal max height to 80% of the screen height
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#434343',
    // If you want a fixed size you can uncomment these:
    // width: 300,
    // height: 500,
  },
  modalHeader: {
    fontSize: 20,
    fontFamily: 'AnonymousPro-Bold',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#89C07D',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginHorizontal: 50,
    shadowOffset: { width: 1, height: 1 }, // Offset of the shadow
    shadowOpacity: 0.5, // Opacity of the shadow
    shadowRadius: 2, // Blur radius of the shadow
    elevation: 3, // Android elevation (affects shadow appearance)
    borderWidth: 2,
    borderColor: '#434343',
  },
  buttonText: {
    color: '#434343',
    fontFamily: 'AnonymousPro-Bold',
    fontSize: 20,
  },
  pickerValue: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    height: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
    borderColor: '#434343',
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 8, // Rounded 
  },
  currentNav: { // override button style
    width: 50,
    height: 50,
    borderRadius: 25, // Make it a circle
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  newTripContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#59585A',
    borderRadius: 8, // Rounded 
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:  '100%',
  },
  toggleButton: {
    backgroundColor: '#1C274C',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  toggleText: {
    color: 'white',
    fontSize: 16, 
    fontFamily: 'AnonymousPro-Bold',
  }
});
