'use client';

import { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

type EventType = {
  title: string;
  date: string;
};

export default function Calendar() {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<EventType[]>([]);

  // FullCalendar API 가져오기
  const getApi = () => calendarRef.current?.getApi();

  // 날짜 클릭 시 이벤트 추가
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateClick = (arg: any) => {
    const title = window.prompt('이벤트 제목을 입력하세요');
    if (title) {
      setEvents((prev) => [...prev, { title, date: arg.dateStr }]);
    }
  };

  // 이벤트 커스텀 렌더링
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderEventContent = (eventInfo: any) => (
    <div className="mb-1 rounded bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-800">
      {eventInfo.event.title}
    </div>
  );

  // 날짜 셀 커스텀(예: 오늘 날짜 강조)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dayCellClassNames = (arg: any) => {
    if (arg.isToday) return ['bg-blue-50', 'border-blue-400'];
    return [];
  };

  return (
    <div className="bg-white p-4">
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => getApi()?.prevYear()}
          className="rounded bg-gray-200 px-2 py-1"
        >
          이전 년도
        </button>
        <button
          onClick={() => getApi()?.prev()}
          className="rounded bg-gray-200 px-2 py-1"
        >
          이전 달
        </button>
        <button
          onClick={() => getApi()?.today()}
          className="rounded bg-blue-500 px-2 py-1 text-white"
        >
          오늘
        </button>
        <button
          onClick={() => getApi()?.next()}
          className="rounded bg-gray-200 px-2 py-1"
        >
          다음 달
        </button>
        <button
          onClick={() => getApi()?.nextYear()}
          className="rounded bg-gray-200 px-2 py-1"
        >
          다음 년도
        </button>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="auto"
        dateClick={handleDateClick}
        events={events}
        eventContent={renderEventContent}
        dayCellClassNames={dayCellClassNames}
      />
      <style jsx global>{`
        .fc-daygrid-day:hover {
          background: #f1f5f9;
          cursor: pointer;
        }
        .fc-day-today {
          border: 2px solid #2563eb !important;
        }
      `}</style>
    </div>
  );
}
