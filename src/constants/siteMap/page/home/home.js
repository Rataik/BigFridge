import { HomepageIndex, HomepageName } from '../../../constants';

export const Page = {
  order: 0,
  isHome: true,
  index: HomepageIndex,
  name: HomepageName,
  svg: {
    icon: 'HomeIcon',
  },
  tiles: [{
    left: '0',
    top: '0',
    height: '175',
    width: '400',
    title: 'Stay Healthy!',
    content: {
      text: 'This fridge is tooo big! Help the eater avoid foodborne illness by giving them a better idea of what\'s inside.',
      isLink: false,
      Link: '',
    },
    svg: {
      icon: 'StayHealthyIcon',
    },
  }, {
    left: '405',
    top: '0',
    height: '175',
    width: '175',
    title: 'Click Me',
    content: {
      isLink: true,
      Link: 'https://github.com/Rataik/BigFridge',
    },
  }, {
    left: '180',
    top: '180',
    height: '175',
    width: '400',
    title: '24 hours to organize the BigFridge',
    content: {
      text: '',
      isLink: false,
      Link: '',
    },
    svg: {
      icon: 'ClockIcon',
    },
  }],
};
