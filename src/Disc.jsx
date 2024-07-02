export default function Disc({ image, label }) {
    return (
        <div className="disc" style={{ backgroundImage: `url(${image})` }}>
            <h3>{label}</h3>
        </div>
    );
}
