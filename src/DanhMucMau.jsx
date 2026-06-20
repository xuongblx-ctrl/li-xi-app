import { useState } from 'react'
import { danhSachMauDatHang } from './duLieuMau'

function DanhMucMau() {
  const [chuDeLoc, setChuDeLoc] = useState('all')

  const mauDaLoc = danhSachMauDatHang.filter((mau) => {
    if (chuDeLoc === 'all') return true
    return mau.chuDe === chuDeLoc
  })

  return (
    <div>
      <h1>Danh mục mẫu</h1>

      <select value={chuDeLoc} onChange={(e) => setChuDeLoc(e.target.value)}>
        <option value="all">Tất cả chủ đề</option>
        <option value="truyen-thong">Truyền thống</option>
        <option value="hien-dai">Hiện đại</option>
        <option value="hoat-hinh">Hoạt hình</option>
      </select>

      <div className="luoi-mau">
        {mauDaLoc.map((mau) => (
          <div key={mau.id} className="the-mau">
            <h3>{mau.ten}</h3>
            <p>{mau.chuDeNhan} · tối thiểu {mau.slToiThieu} cái</p>
            <p>{mau.gia.toLocaleString('vi-VN')}đ /cái</p>
            <button>Đặt mẫu này</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DanhMucMau