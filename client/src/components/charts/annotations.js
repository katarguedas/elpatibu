import { theme } from '../../themes/theme';


const getAnnotations = (identifier)=>{

  switch (identifier) {
    case 'P2':
      return {
        annotations: {
          line1: {
            type: 'line',
            yMin: 120,
            yMax: 120,
            borderColor: theme.colors.col5,
            borderWidth: 2,
            label: {
              display: true,
              content: 'Optimalwert',
              position: 'end',
              yAdjust: 15,
              padding: 5,
              backgroundColor: theme.colors.col4,
              color: theme.colors.col5
            }
          },
          line2: {
            type: 'line',
            yMin: 80,
            yMax: 80,
            borderColor: theme.colors.col3,
            borderWidth: 2,
            label: {
              display: true,
              content: 'Optimalwert',
              position: 'end',
              yAdjust: 15,
              padding: 5,
              backgroundColor: theme.colors.col4,
              color: theme.colors.col3
            }
          }
        }
      };
    case 'T':
      return 'test';
    default:
      return null;
  }

}

export default getAnnotations;