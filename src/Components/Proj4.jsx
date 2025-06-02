import { useState } from "react";
import "../assets/Css/EmojiInterpreter.css";

const emojiDictionary = {
  "😀": "Grinning Face",
  "😂": "Face with Tears of Joy",
  "❤️": "Red Heart",
  "🔥": "Fire",
  "🙏": "Folded Hands",
  "🎉": "Party Popper",
  "😢": "Crying Face",
  "😎": "Smiling Face with Sunglasses",
  "👍": "Thumbs Up",
  "💡": "Light Bulb",
  "😡": "Angry Face",
  "🥺": "Pleading Face",
  "🤔": "Thinking Face",
  "🙌": "Raising Hands",
  "😴": "Sleeping Face",
  "💯": "Hundred Points",
  "🎂": "Birthday Cake",
  "🚀": "Rocket",
  "🌟": "Glowing Star",
  "🤗": "Hugging Face"
};


const Proj4 = () => {
  const [meaning, setMeaning] = useState("");
  const [inputEmoji, setInputEmoji] = useState("");

  const handleInputChange = (e) => {
    const emoji = e.target.value.trim();
    setInputEmoji(emoji);

    if (emojiDictionary[emoji]) {
      setMeaning(emojiDictionary[emoji]);
    } else if (emoji === "") {
      setMeaning("");
    } else {
      setMeaning("Sorry, we don’t have this emoji in our database.");
    }
  };

  const handleEmojiClick = (emoji) => {
    setInputEmoji(emoji);
    setMeaning(emojiDictionary[emoji]);
  };

  return (
    <div className="emoji-container">
      <h2 className="title">Emoji Interpreter</h2>

      <input
        type="text"
        placeholder="Enter an emoji here"
        value={inputEmoji}
        onChange={handleInputChange}
        className="emoji-input"
        maxLength={2}
      />

      <div className="meaning">{meaning}</div>

      <h3>Click on an emoji to know its meaning:</h3>
      <div className="emoji-list">
        {Object.keys(emojiDictionary).map((emoji) => (
          <span
            key={emoji}
            className="emoji-item"
            onClick={() => handleEmojiClick(emoji)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEmojiClick(emoji);
            }}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Proj4;
