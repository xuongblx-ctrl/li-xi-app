import { useState } from 'react'
import { thuVienMauTheoNam } from './duLieuMau'

function ThuVienMau() {
  const [namLoc, setNamLoc] = useState('all')

  const tatCaNam = [...new Set(thuVienMauTheoNam.map((m) => m.nam))].sort((a, b) => b - a)

  const mauDaLoc = thuVienMauTheoNam.filter((mau) => {
    if (namLoc === 'all') return true
    return mau.nam === namLoc
  })

  return (
    <div>
      <h1>Mẫu qua các năm</h1>
      <p className="ghi-chu-thu-vien">Thư viện tham khảo, không đặt hàng trực tiếp ở đây.</p>

      <div className="hang-nut-nam">
        <button
          className={namLoc === 'all' ? 'nut-nam dang-chon' : 'nut-nam'}
          onClick={() => setNamLoc('all')}
        >
          Tất cả
        </button>
        {tatCaNam.map((nam) => (
          <button
            key={nam}
            className={namLoc === nam ? 'nut-nam dang-chon' : 'nut-nam'}
            onClick={() => setNamLoc(nam)}
          >
            {nam}
          </button>
        ))}
      </div>

      <div className="luoi-mau">
        {mauDaLoc.map((mau) => (
          <div key={mau.id} className="the-mau">
            <h3>{mau.ten}</h3>
            <p>{mau.nam} · {mau.moTa}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ThuVienMau