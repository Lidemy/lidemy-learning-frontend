<NoteModal
  visible={noteVisible}
  onCancel={() => setNoteVisible(false)}
  onConfirm={handleCreateNote}
/>;
