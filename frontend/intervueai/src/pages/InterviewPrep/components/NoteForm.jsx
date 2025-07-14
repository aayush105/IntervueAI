import { useState } from "react";
import LOGO_ICON_BLACK from "../../../assets/logo_black.png";
import Input from "../../../components/Inputs/Input";
import { FaSave, FaStickyNote, FaTrash } from "react-icons/fa";
import ErrorMessage from "../../../components/ErrorMessage";
import { RiSparklingFill } from "react-icons/ri";

const NoteForm = ({ currentNote, onSave, onClose, question }) => {
  const [note, setNote] = useState(currentNote || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // handle save note
  const handleSave = async (e) => {
    e.preventDefault();

    if (!note.trim()) {
      setError("Please enter a note before saving.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await onSave(note.trim());
      onClose();
    } catch (error) {
      setError("Failed to save note. Please try again.");
      console.error("Error saving note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // handle delete note
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onSave(""); // Send empty string to delete note
      onClose();
    } catch (error) {
      setError("Failed to delete note. Please try again.");
      console.error("Error deleting note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      {/* header */}
      <div className="text-center mb-6">
        <div className="flex justify-center">
          <img src={LOGO_ICON_BLACK} alt="Logo" className="w-20 sm:w-24" />
        </div>

        <p className="text-gray-600">
          Add your personal insights and reminders for this question
        </p>
      </div>

      {/* question preview */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-white">Q</span>
          </div>
          <p className="text-sm text-gray-700 font-medium leading-relaxed line-clamp-3">
            {question}
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <Input
          value={note}
          onChange={({ target }) => setNote(target.value)}
          label="Your Note"
          placeholder="Add your thoughts, insights, or reminders about this question..."
          type="text"
          icon={FaStickyNote}
          textArea={true}
          rows={5}
          disabled={isLoading}
        />

        {error && <ErrorMessage error={error} />}

        {/* action buttons */}
        <div className="flex gap-3 items-center">
          {currentNote && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="flex cursor-pointer items-center gap-2 px-4 py-3 text-red-600 bg-red-50 border-red-200 rounded-xl hover:bg-red-100 hover:border-red-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <FaTrash className="w-4 h04" />
              Delete Note
            </button>
          )}

          <button
            type="submit"
            disabled={isLoading || !note.trim()}
            className="flex-1 cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {currentNote ? "Updating..." : "Saving..."}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FaSave className="w-4 h-4" />
                {currentNote ? "Update Note" : "Save Note"}
              </div>
            )}
          </button>
        </div>

        {/* info note */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-amber-700 text-sm">
            <RiSparklingFill className="w-4 h-4" />
            <span className="font-medium">
              Notes help you remember key insights and preparation tips
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
