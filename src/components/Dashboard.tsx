import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useStudent } from '../contexts/StudentContext';
import ProgressBar from './ProgressBar';
import type { SubjectKey } from '../data/students';

const DAYS = ['日', '月', '火', '水', '木', '金', '土'];

const SUBJECT_ORDER: SubjectKey[] = ['japanese', 'math', 'science', 'social', 'english'];

export default function Dashboard() {
  const { activeStudent } = useStudent();
  const { subjects, weeklyStudy, badges, totalPoints, name, grade, avatar, color } =
    activeStudent;

  const radarData = SUBJECT_ORDER.map(key => ({
    subject: subjects[key].name,
    score: subjects[key].progress,
  }));

  const earnedBadges = badges.filter(b => b.earned);
  const unearnedBadges = badges.filter(b => !b.earned);

  const studyDaysCount = weeklyStudy.filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Student Hero Card */}
      <div
        className="rounded-2xl p-6 text-white shadow-lg"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{avatar}</div>
            <div>
              <h2 className="text-2xl font-bold">{name}さん</h2>
              <p className="text-white text-opacity-90">小学{grade}年生</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{totalPoints}</div>
            <div className="text-sm text-white text-opacity-90">ポイント</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 bg-white bg-opacity-20 rounded-xl p-4">
          <div className="text-center">
            <div className="text-xl font-bold">{studyDaysCount}</div>
            <div className="text-xs text-white text-opacity-80">今週の学習日</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{earnedBadges.length}</div>
            <div className="text-xs text-white text-opacity-80">獲得バッジ</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">
              {Math.round(
                SUBJECT_ORDER.reduce((sum, k) => sum + subjects[k].progress, 0) /
                  SUBJECT_ORDER.length,
              )}
              %
            </div>
            <div className="text-xs text-white text-opacity-80">平均進捗</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span>📊</span> 教科バランス
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 13, fill: '#374151', fontWeight: 600 }}
              />
              <Radar
                name="進捗"
                dataKey="score"
                stroke={color}
                fill={color}
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, '進捗']}
                contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Calendar */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span>📅</span> 今週の学習カレンダー
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {DAYS.map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-1.5">
                <span className="text-xs font-medium text-gray-500">{day}</span>
                <div
                  className={`
                    w-10 h-10 rounded-xl flex items-center justify-center text-lg
                    transition-all duration-200
                    ${weeklyStudy[i]
                      ? 'shadow-md scale-105'
                      : 'bg-gray-100'
                    }
                  `}
                  style={weeklyStudy[i] ? { backgroundColor: color + '33', border: `2px solid ${color}` } : {}}
                >
                  {weeklyStudy[i] ? '⭐' : ''}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500 text-center">
            {studyDaysCount === 0 && 'さあ、今週も一緒にがんばろう！'}
            {studyDaysCount >= 1 && studyDaysCount <= 2 && 'いいスタートだよ！続けよう！'}
            {studyDaysCount >= 3 && studyDaysCount <= 4 && 'いいペースで学習中！'}
            {studyDaysCount >= 5 && studyDaysCount <= 6 && 'すごい！毎日がんばってるね！'}
            {studyDaysCount === 7 && '完璧！全日学習達成！'}
          </p>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-700 mb-5 flex items-center gap-2">
          <span>📚</span> 教科別の進捗
        </h3>
        <div className="space-y-5">
          {SUBJECT_ORDER.map(key => {
            const subj = subjects[key];
            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">{subj.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
                      style={{ backgroundColor: subj.color }}>
                      Lv.{subj.level}
                    </span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: subj.color }}>
                    {subj.progress}%
                  </span>
                </div>
                <ProgressBar value={subj.progress} color={subj.color} height={10} />
                <div className="mt-2 flex gap-3 flex-wrap">
                  {subj.strengths.slice(0, 2).map(s => (
                    <span key={s} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-200">
                      ✓ {s}
                    </span>
                  ))}
                  {subj.weaknesses.slice(0, 1).map(w => (
                    <span key={w} className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full border border-orange-200">
                      ▲ {w}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
          <span>🏆</span> バッジコレクション
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {earnedBadges.map(badge => (
            <div key={badge.id} className="flex flex-col items-center gap-1 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <span className="text-2xl">{badge.emoji}</span>
              <span className="text-xs text-center font-medium text-yellow-700 leading-tight">{badge.label}</span>
            </div>
          ))}
          {unearnedBadges.map(badge => (
            <div key={badge.id} className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-xl border border-gray-200 opacity-50">
              <span className="text-2xl grayscale">{badge.emoji}</span>
              <span className="text-xs text-center font-medium text-gray-500 leading-tight">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
