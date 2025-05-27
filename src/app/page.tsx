'use client';

import { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateClickArg } from '@fullcalendar/interaction';
import { EventContentArg } from '@fullcalendar/core';

type EventType = {
  title: string;
  date: string;
};

// dayCellClassNames 인자 타입 직접 정의
// 공식 타입 export가 없어 date, isToday, 기타 속성 포함
// https://fullcalendar.io/docs/day-cell-render-hooks 참고
// https://github.com/fullcalendar/fullcalendar/issues/7262

type DayCellClassNamesArg = {
  date: Date;
  isToday: boolean;
  [key: string]: unknown;
};

export default function Calendar() {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<EventType[]>([]);

  // FullCalendar API 가져오기
  const getApi = () => calendarRef.current?.getApi();

  // 날짜 클릭 시 이벤트 추가
  const handleDateClick = (arg: DateClickArg) => {
    const title = window.prompt('이벤트 제목을 입력하세요');
    if (title) {
      setEvents((prev) => [...prev, { title, date: arg.dateStr }]);
    }
  };

  // 이벤트 커스텀 렌더링
  const renderEventContent = (eventInfo: EventContentArg) => (
    <div className="mb-1 rounded bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-800">
      {eventInfo.event.title}
    </div>
  );

  // 날짜 셀 커스텀(예: 오늘 날짜 강조)
  const dayCellClassNames = (arg: DayCellClassNamesArg) => {
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
        firstDay={1}
      />
      <style jsx global>{`
        .fc {
          background: #fffbe6 !important;
        }
        .fc-header-toolbar {
          background: #ffe4e6 !important;
          border: 2px solid #ff80b5 !important;
        }
        .fc-toolbar {
          background: #e0f2fe !important;
          border: 2px solid #38bdf8 !important;
        }
        .fc-toolbar-title {
          color: #be185d !important;
          background: #fce7f3 !important;
        }
        .fc-button {
          background: #fca5a5 !important;
          color: #1e293b !important;
          border: 2px dashed #ef4444 !important;
        }
        .fc-button-primary {
          background: #fbbf24 !important;
          color: #fff !important;
        }
        .fc-button-active {
          background: #34d399 !important;
          color: #fff !important;
        }
        .fc-daygrid {
          background: #f0fdf4 !important;
        }
        .fc-daygrid-day {
          background: #e0e7ff !important;
          border: 2px solid #6366f1 !important;
        }
        .fc-daygrid-day-number {
          color: #000 !important;
          font-weight: bold;
        }
        .fc-day-today {
          background: #fef9c3 !important;
          border: 3px solid #f59e42 !important;
        }
        .fc-day-past {
          background: #f3f4f6 !important;
          color: #6b7280 !important;
        }
        .fc-day-future {
          background: #f0fdf4 !important;
          color: #047857 !important;
        }
        .fc-day-sat {
          background: #dbeafe !important;
        }
        .fc-day-sun {
          background: #fee2e2 !important;
        }
        .fc-day-sun .fc-daygrid-day-number {
          color: #ff0000 !important;
        }
        .fc-day-sat .fc-daygrid-day-number {
          color: #0000ff !important;
        }
        .fc-event {
          background: #f472b6 !important;
          color: #fff !important;
          border: 2px solid #be185d !important;
        }
        .fc-event-title {
          color: #fff !important;
        }
        .fc-event-time {
          color: #fbbf24 !important;
        }
        .fc-event-main {
          background: #f9fafb !important;
        }
        .fc-daygrid-event-dot {
          background: #f59e42 !important;
        }
        .fc-scrollgrid {
          background: #f1f5f9 !important;
        }
        .fc-scrollgrid-section {
          background: #e0e7ff !important;
        }
        .fc-scrollgrid-sync-table {
          background: #fef2f2 !important;
        }
        .fc-col-header {
          background: #f3e8ff !important;
        }
        .fc-col-header-cell {
          background: #a7f3d0 !important;
          color: #065f46 !important;
          border: 2px solid #10b981 !important;
        }
        .fc-daygrid-week-number {
          background: #fca5a5 !important;
          color: #fff !important;
        }
        .fc-highlight {
          background: #fde68a !important;
        }
        .fc-bg-event {
          background: #a5b4fc !important;
          opacity: 0.5 !important;
        }
        .fc-non-business {
          background: #f3f4f6 !important;
        }
        .fc-popover {
          background: #fef3c7 !important;
          border: 2px solid #f59e42 !important;
        }
        .fc-list {
          background: #f1f5f9 !important;
        }
        .fc-list-event {
          background: #fca5a5 !important;
          color: #fff !important;
        }
        .fc-list-day {
          background: #fef9c3 !important;
          color: #92400e !important;
        }
        .fc-list-table {
          background: #e0e7ff !important;
        }
        .fc-list-heading {
          background: #fbbf24 !important;
          color: #fff !important;
        }
        .fc-list-heading-main {
          color: #fff !important;
        }
        .fc-list-heading-alt {
          color: #f59e42 !important;
        }
        .fc-list-event-dot {
          background: #be185d !important;
        }
        .fc-list-event-title {
          color: #fff !important;
        }
        .fc-list-event-time {
          color: #fbbf24 !important;
        }
        .fc-list-empty {
          background: #f3f4f6 !important;
          color: #6b7280 !important;
        }
      `}</style>
    </div>
  );
}
