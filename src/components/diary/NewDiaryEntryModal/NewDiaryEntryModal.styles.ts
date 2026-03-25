import { createThemedStyleSheet, Theme } from '@/src/containers/ThemeContext';

export const useThemedStyle = createThemedStyleSheet((theme: Theme) => ({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    position: 'relative',
    backgroundColor: theme.colors.background,
  },
  textInput: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  moodsInput: {
    marginBottom: 10,
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imagesInput: {
    flexDirection: 'row',
    flexGrow: 0,
  },
  imageButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'dashed',
    borderColor: theme.colors.secondaryVariant,
  },
  addImageButton: {
    margin: 20,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: theme.colors.accent,
  },
  buttonText: {
    color: theme.colors.onAccent,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
  modalView: {
    margin: 30,
    maxHeight: '80%',
    backgroundColor: 'white',
    padding: 30,
    width: '100%',
  },
  modalScrollView: { marginBottom: 20 },
  moodSelectorItem: { flexDirection: 'row', gap: 5 },
  moodSelectorItemSeparator: { marginBottom: 15 },
  selectedMoodsList: { color: theme.colors.secondary },
  header: {
    flexDirection: 'column',
  },
  headerItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 10,
  },
  headerText: {
    color: theme.colors.secondaryVariant,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    zIndex: 100,
  },
  addButtonIcon: {
    backgroundColor: theme.colors.accent,
    padding: 10,
    borderRadius: 30,
  },
  cameraContainer: {
    zIndex: 500,
  },
}));
