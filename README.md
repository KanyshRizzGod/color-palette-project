# Palette Generator App

## Description

This is a React application for generating and sharing color palettes. Users can create random color palettes, select colors from generated palettes, share palettes via a URL, and delete palettes.

## Installation

1. Clone the repository: `git clone <repository_url>`
2. Navigate to the project directory: `cd <project_directory>`
3. Install dependencies: `npm install` or `yarn install`

## Usage

1. Start the development server: `npm start` or `yarn start`
2. Open your browser and go to `http://localhost:3000` to view the application.
3. Click on the "Generate Random Palette" button to create a new random palette.
4. Click on the colors in the generated palettes to select them. The selected color will be displayed and can be modified using the color picker.
5. Click on the "Share Palette" button to generate a shareable URL for the current palette.
6. Click on the "Delete Palette" button to remove a palette from the list.
7. Shared palettes can be viewed using the generated URL.

## Technologies Used

- React
- React Router
- Styled Components
- react-color (ChromePicker)
- HTML
- CSS

## File Structure

- `components/Header.js`: Header component for the application.
- `components/SimplePalette.js`: Component to display a simple color palette.
- `Share.js`: Component to display the shareable URL.
- `SharedPalette.js`: Component to display a shared palette.
- `App.js`: Main application component containing the logic for palette generation, selection, sharing, and deletion.

## Data Storage and Compromises

This application does not require a database for storing color palettes. Instead, the colors of generated palettes are encoded as query parameters in the URL for sharing purposes. This means that the application can be used without the need for persistent storage, making it lightweight and easy to deploy. However, because of this the function of editing the palette together can not be realized.

## Sharing Palettes

To share a palette, the values of the colors in the generated palette are encoded as query parameters in the URL. Each color is represented as a hexadecimal value preceded by an underscore. For example, a palette with colors `#FFFFFF`, `#000000`, `#FF0000`, `#00FF00`, and `#0000FF` would be encoded as `?palette=FFFFFF_000000_FF0000_00FF00_0000FF`. This URL can then be shared with others, allowing them to view and use the same color palette.

## Conclusion

This project can be considered as a level 2.5 because it can share palettes only technically and it does not allow users to edit the same color palette
