import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import FormDatDon from './FormDatDon'
import DanhMucMau from './DanhMucMau'
import ThuVienMau from './ThuVienMau'
import './App.css'

const CAC_CONG_DOAN = ['Nhận đơn', 'In', 'Cắt / gia công', 'Đóng gói', 'Giao']

function ThanhTienDo({ buocHienTai }) {
  return (
    <div>
      <div className="thanh-tien-do">
        {CAC_CONG_DOAN.map((ten, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div className={`cham ${idx <= buocHienTai ? 'da-qua' : ''}`}></div>
            {idx < CAC_CONG_DOAN.length - 1 && (
              <div className={`noi-cham ${idx < buocHienTai ? 'da-qua' : ''}`}></div>
            )}
          </div>
        ))}
      </div>
      <p className="ten-cong-doan">{CAC_CONG_DOAN[buocHienTai]}</p>
    </div>
  )
}

function TrangDonHang() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    layDonHang()
  }, [])

  async function layDonHang() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Lỗi khi lấy đơn hàng:', error)
    } else {
      setOrders(data)
    }
    setLoading(false)
  }

  return (
    <div>
      <FormDatDon onDatDonThanhCong={layDonHang} />

      <h1>Đơn hàng</h1>

      {loading && <p>Đang tải đơn hàng...</p>}

      {!loading && orders.map((don) => (
        <div key={don.id} className="don-hang">
          <div className="don-hang-dong-tren">
            <div>
              <p className="don-hang-ten"><strong>{don.code}</strong> · {don.client}</p>
              <p className="don-hang-phu">{don.qty} cái</p>
            </div>
          </div>
          <ThanhTienDo buocHienTai={don.stage_idx} />
        </div>
      ))}
    </div>
  )
}

const CAC_TAB = [
  { key: 'catalog', ten: 'Danh mục mẫu' },
  { key: 'archive', ten: 'Mẫu qua các năm' },
  { key: 'orders', ten: 'Đơn hàng' },
]

function App() {
  const [tabHienTai, setTabHienTai] = useState('catalog')

  return (
    <div>
      <div className="hang-tab">
        {CAC_TAB.map((tab) => (
          <button
            key={tab.key}
            className={tabHienTai === tab.key ? 'nut-tab dang-chon' : 'nut-tab'}
            onClick={() => setTabHienTai(tab.key)}
          >
            {tab.ten}
          </button>
        ))}
      </div>

      {tabHienTai === 'catalog' && <DanhMucMau />}
      {tabHienTai === 'archive' && <ThuVienMau />}
      {tabHienTai === 'orders' && <TrangDonHang />}
    </div>
  )
}

export default App