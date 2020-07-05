export const Colors = {
  primary: "#ea7156",
  primary_dark: "#d35234", 
  black: "#000",
  grey: 'grey',
  dark: "#444",
  light: "#cbd1d6",
  lighter: "#F3F3F3",
  white: "#FFF",
  error: 'red',
}

export const theme = {
  Button: {
    raised: true,
    buttonStyle: {
      backgroundColor: Colors.primary,
    },
    containerStyle: {
      width: '90%',
      alignSelf: 'center',
      marginTop: 5,
    },
    titleStyle: {
    },
  },
  Input: {
    raised: true,
    containerStyle: {
      width: '90%',
      alignSelf: 'center',
    },
    labelStyle: {
      marginBottom: -7,
    },
  },
  Text: {
    color: Colors.dark,
    h4Style: {
      fontSize: 22,
    },
    h3Style: {
      fontSize: 24,
    },
  },
}