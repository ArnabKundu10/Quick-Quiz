import React from 'react';
import { Trophy, Star, Award } from 'lucide-react';

const Gamification = ({ score, streak, achievements }) => {
  return (
    <div className="fixed bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
          <span>{score} pts</span>
        </div>
        <div className="flex items-center">
          <Star className="w-5 h-5 text-orange-500 mr-2" />
          <span>{streak} streak</span>
        </div>
        <div className="flex items-center">
          <Award className="w-5 h-5 text-purple-500 mr-2" />
          <span>{achievements.length} badges</span>
        </div>
      </div>
    </div>
  );
};

export default Gamification;