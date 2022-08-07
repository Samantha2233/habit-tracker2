import create from 'zustand';
import moment from 'moment';

const today = moment().format('MMDDYYYY');

interface State {
  dateSelected: string;
  setDateSelected: (input: string) => void;
}

export const useDateStore = create<State>((set) => {
  return {
    dateSelected: today,
    setDateSelected: (input) => set(() => ({ dateSelected: input })),
  };
});

//when invoked, this will remove the subscriber
// const unsubcribe = useStore.subscribe(
//   (newValue, oldValue) => {
//     console.log('previous value was:' + oldValue);
//     console.log('New value: ' + newValue);
//   },
//   (state) => state.dateSelected
// );
