import { createSlice } from "@reduxjs/toolkit"

const mockItems = [
  {id: 'id1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum ornare faucibus.', moods: ['happy']},
  {id: 'id2', text: 'Nullam porttitor urna metus, eu tincidunt dolor semper a. Donec maximus dolor vel elit ultrices ultrices.', moods: ['sad']},
  {id: 'id3', text: 'Morbi eu velit nec leo luctus pretium nec ut mi. Nunc id nulla vel elit sagittis rutrum ac vel quam. Proin semper tellus velit, nec tincidunt diam hendrerit scelerisque.', moods: ['angry']},
  {id: 'id4', text: 'Sed dignissim, mi quis feugiat imperdiet, nulla felis egestas sem, quis luctus erat erat varius libero. Nam vulputate iaculis ornare. Integer id ornare velit, eget congue purus.', moods: ['happy', 'joyful']},
  {id: 'id5', text: 'Suspendisse sed porta purus. Praesent auctor nec turpis id lobortis.', moods: ['happy']},
  {id: 'id6', text: 'Nam lacus velit, sodales vitae maximus id, vehicula dictum neque.', moods: ['happy', 'sad']},
  {id: 'id7', text: 'Nulla luctus, metus nec lacinia sollicitudin, enim ex vestibulum lorem, sit amet tincidunt neque urna at velit. Praesent malesuada tincidunt sodales. Nullam nec ligula mauris. Duis at auctor nisl.', moods: ['happy', 'angry']},
  {id: 'id8', text: 'Duis vitae porta eros. In scelerisque pharetra velit, et vulputate arcu sollicitudin vitae. Donec eu metus tristique, pellentesque dui nec, porta tellus. In in est ex. Maecenas et velit euismod, laoreet tortor ac, pellentesque purus.', moods: ['sad']},
  {id: 'id9', text: 'Duis malesuada malesuada posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque lacinia leo tortor, et venenatis nisl convallis non. Donec mi lorem, commodo nec velit eget, ultricies congue ligula. Cras vitae augue viverra, vehicula purus et, aliquam libero. Integer molestie ligula eros, non ultrices libero egestas in.', moods: ['depressive']},
  {id: 'id10', text: 'Praesent in porttitor orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam pellentesque lacinia velit eget ultrices.', moods: ['tired', 'sad']},
]

const diarySlice = createSlice({
    name: 'diary',
    initialState: {
        entries: mockItems
    },
    reducers: {
        addEntry: (state, action) => {
            state.entries.push(action.payload)
        }
    },
    selectors: {
        diaryEntries: state => state.entries
    }
})

export const { addEntry } = diarySlice.actions
export const { diaryEntries } = diarySlice.selectors

export default diarySlice.reducer