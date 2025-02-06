import React, { useState, useEffect } from 'react';
import { Brain, Check, Trophy, PartyPopper } from 'lucide-react';

// AI buzzwords for the bingo board
const aiTerms = [
  // Core AI & ML Concepts
  "Neural Network", "Machine Learning", "Deep Learning", "Natural Language Processing",
  "Computer Vision", "Reinforcement Learning", "Supervised Learning", "Unsupervised Learning",
  "Self-Supervised Learning", "Semi-Supervised Learning", "Transfer Learning", "Generative AI",
  "Large Language Model", "Transformer", "Attention Mechanism", "Gradient Descent",
  "Backpropagation", "Autoencoder", "Model Compression", "Knowledge Distillation",

  // Model Architectures & Techniques
  "Convolutional Neural Network", "Recurrent Neural Network", "Long Short-Term Memory (LSTM)",
  "Gated Recurrent Unit (GRU)", "BERT", "GPT", "Diffusion Model", "Variational Autoencoder (VAE)",
  "GAN (Generative Adversarial Network)", "Bayesian Network", "Self-Attention", "Multi-Head Attention",
  "Sparse Attention", "Bidirectional Encoding", "Graph Neural Network (GNN)", "Graph Embeddings",
  "Meta-Learning", "Federated Learning",

  // Data Science & Feature Engineering
  "Feature Engineering", "Dimensionality Reduction", "Principal Component Analysis (PCA)",
  "t-SNE", "UMAP", "Feature Extraction", "Tokenization", "Word Embeddings", "Word2Vec",
  "GloVe", "FastText", "One-Hot Encoding", "TF-IDF", "Named Entity Recognition (NER)",
  "Part-of-Speech Tagging", "Dependency Parsing", "Semantic Search", "Vector Database",

  // Training & Optimization
  "Training Data", "Fine-Tuning", "Hyperparameter Tuning", "Batch Normalization", "Dropout",
  "Cross-Validation", "Bias-Variance Tradeoff", "Overfitting", "Underfitting", "Regularization",
  "Loss Function", "Activation Function", "Optimization Algorithm", "Adam Optimizer",
  "Stochastic Gradient Descent (SGD)", "Momentum", "Learning Rate Decay", "Few-Shot Learning",
  "Zero-Shot Learning", "Multi-Task Learning", "Continual Learning", "Model Pruning",
  "Quantization", "Sparse Models", "Low-Rank Adaptation (LoRA)", "Prompt Engineering",

  // Deployment & Applications
  "Model Inference", "Latency", "Throughput", "A/B Testing", "Edge AI", "Embedded AI",
  "MLOps", "Data Pipeline", "Model Drift", "Explainability (XAI)", "Bias Mitigation",
  "Fairness in AI", "Ethical AI", "Adversarial Attacks", "Security in AI", "Interpretability",
  "Shapley Values", "LIME (Local Interpretable Model-Agnostic Explanations)", "Data Augmentation",
  "Synthetic Data", "Data Labeling", "Self-Training", "Human-in-the-Loop AI"
];

function shuffleArray(array: string[]) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function checkBingo(marks: boolean[]): boolean {
  // Check rows
  for (let i = 0; i < 5; i++) {
    if (marks.slice(i * 5, (i + 1) * 5).every(Boolean)) return true;
  }
  // Check columns
  for (let i = 0; i < 5; i++) {
    if ([0, 1, 2, 3, 4].every(j => marks[i + j * 5])) return true;
  }
  // Check diagonals
  if ([0, 6, 12, 18, 24].every(i => marks[i])) return true;
  if ([4, 8, 12, 16, 20].every(i => marks[i])) return true;
  return false;
}

function App() {
  const [board, setBoard] = useState<string[]>([]);
  const [marks, setMarks] = useState<boolean[]>(new Array(25).fill(false));
  const [hasBingo, setHasBingo] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Generate a new random board on initial load
    setBoard(shuffleArray(aiTerms).slice(0, 25));
  }, []);

  useEffect(() => {
    if (checkBingo(marks)) {
      setHasBingo(true);
    }
    // Check if all squares are marked
    if (marks.every(Boolean)) {
      setIsComplete(true);
    }
  }, [marks]);

  const handleSquareClick = (index: number) => {
    const newMarks = [...marks];
    newMarks[index] = !newMarks[index];
    setMarks(newMarks);
    setSelectedTerm(index);
  };

  const handleNewGame = () => {
    setBoard(shuffleArray(aiTerms).slice(0, 25));
    setMarks(new Array(25).fill(false));
    setHasBingo(false);
    setIsComplete(false);
    setSelectedTerm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Brain className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-800">AI Buzzword Bingo</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Network with others and find someone who can explain each AI term before marking it off.
            First to get 5 in a row (horizontal, vertical, or diagonal) wins! Keep going to fill the whole board!
          </p>
          <button
            onClick={handleNewGame}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Start New Game
          </button>
        </div>

        {hasBingo && !isComplete && (
          <div className="mb-6 p-4 bg-green-100 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6 text-green-600" />
              <p className="text-green-700 font-semibold">BINGO! Keep going to complete the board!</p>
            </div>
          </div>
        )}

        {isComplete && (
          <div className="mb-6 p-4 bg-purple-100 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2">
              <PartyPopper className="w-6 h-6 text-purple-600" />
              <p className="text-purple-700 font-semibold">Congratulations! You've completed the entire board!</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-5 gap-2 mb-6">
          {board.map((term, index) => (
            <button
              key={index}
              onClick={() => handleSquareClick(index)}
              className={`
                aspect-square p-2 rounded-lg text-sm font-medium transition-all
                ${marks[index] 
                  ? 'bg-purple-600 text-white shadow-lg transform scale-[0.98]' 
                  : 'bg-white text-gray-700 shadow-md hover:shadow-lg hover:scale-[1.02]'}
                ${selectedTerm === index ? 'ring-2 ring-blue-400' : ''}
              `}
            >
              <div className="h-full flex flex-col items-center justify-center">
                {term}
                {marks[index] && <Check className="w-4 h-4 mt-1" />}
              </div>
            </button>
          ))}
        </div>

        {selectedTerm !== null && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-gray-800 mb-2">Selected Term: {board[selectedTerm]}</h2>
            <p className="text-gray-600">
              Find someone who can explain this term to you before marking it off!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;